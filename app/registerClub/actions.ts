'use server';

import {createClient} from '@/utils/supabase/server';
import {decode} from 'base64-arraybuffer';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

export async function signUpNewClub({clubData, ownerData}) {
  const supabase = createClient();

  const userSignUpData = {
    email: ownerData.email,
    password: ownerData.password,
  };
  // const userSignUpData = {
  //   email: 'xxx2132133@demail.com', password: 'random123'
  // }

  // Create a new AUTH user

  const {data: userData, error: userError} = await supabase.auth.signUp(userSignUpData);

  console.log('userData:', userData);
  console.log('userError:', userError);
  console.log('\n\n');

  // Create a new club

  const {data: newClubData, error: clubError} = await supabase
    .from('clubs')
    .insert([
      {
        name: clubData.name,
        city_name: clubData.city,
        house_and_appartment_number: clubData.houseNumber,
        postal_code: clubData.postalCode,
        street_name: clubData.street,
        phone_number: clubData.phoneNumber,
        email: clubData.email,
        website: clubData.website,
      },
    ])
    .select();

  console.log('newClubData:', newClubData);
  console.log('clubError:', clubError);
  console.log('\n\n');

  // Upload the club logo to the bucket storage
  if (clubData.logo) {
    const base64 = clubData.logo.split('base64,')[1];

    const {data: logoData, error: logoError} = await supabase.storage
      .from('club_logos')
      .upload(`${newClubData[0].id}`, decode(base64), {
        contentType: 'image/png',
      });

    console.log('logoData:', logoData);
    console.log('logoError:', logoError);
    console.log('\n\n');

    // Update club_logo_src in the clubs table
    if (!logoError) {
      const {data: updatedClubData, error: updatedClubError} = await supabase
        .from('clubs')
        .update({logo_src: logoData.path})
        .eq('id', newClubData[0].id);
    }
  }

  let avatar_src = null;

  // Upload the user avatar to the bucket storage
  if (ownerData.avatar) {
    const base64 = ownerData.avatar.split('base64,')[1];

    const {data: avatarData, error: avatarError} = await supabase.storage
      .from('user_avatars')
      .upload(`${userData.user.id}`, decode(base64), {
        contentType: 'image/png',
      });

    console.log('avatarData:', avatarData);
    console.log('avatarError:', avatarError);
    console.log('\n\n');

    // Get the avatar URL
    if (!!avatarError) {
      avatar_src = avatarData.path;
    }
  }

  // Create a new user profile with the club_id

  const {data: userProfileData, error: userProfileError} = await supabase.from('users').insert([
    {
      id: userData.user.id,
      full_name: ownerData.fullName,
      email: ownerData.email,
      club_id: newClubData[0].id,
      avatar_src: avatar_src,
    },
  ]);

  if (userError || clubError || userProfileError) {
    console.log('userError:', userError);
    console.log('clubError:', clubError);
    console.log('userProfileError:', userProfileError);
    console.log('\n\n');
    redirect('/error');
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

// export async function signUpNewClubWithFacebook({
//   clubName
// }) {
//   const supabase = createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs

//   console.log("Called signUpNewClub")

//   // const { error: userError } = await supabase.auth.signUp(userSignUpData)
//   // const { user, session, error: userError } = await supabase.auth.signInWithOAuth({
//   //   provider: 'facebook'
//   // })
//   const {} = await supabase.auth.signInWithOAuth({
//     provider: 'facebook'
//   })

//   const { data, error: clubError } = await supabase
//   .from('clubs')
//   .insert([{ "club_name": clubName}])

//   if (userError || clubError) {
//     console.log("userError:", userError)
//     console.log("clubError:", clubError)

//     redirect('/error')
//   }

//   revalidatePath('/dashboard', 'layout')
//   redirect('/dashboard')
// }
