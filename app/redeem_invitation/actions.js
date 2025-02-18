'use server';

import {createClient} from '@/utils/supabase/server';
import crypto from 'crypto';
import {redirect} from 'next/navigation';

// Function to hash a token using SHA-256
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function registerAdminUser({fullName, email, password, token}) {
  console.log({fullName, email, password, token});

  const supabase = createClient();

  // Get the invitation data
  const {data: invitationData, error: invitationError} = await supabase
    .from('user_invitations')
    .select('*')
    .eq('hashed_token', hashToken(token))
    .eq('email', email)
    .eq('role', 'admin')
    .single();

  if (invitationData) {
    // Check if the token is still valid
    if (new Date(invitationData.valid_until) > new Date()) {
      // Create the user
      const {user, error} = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('user', user);
      console.log('error', error);

      if (user) {
        // Create user profile
        const {data: userProfileData, error: userProfileError} = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: user.id,
              full_name: fullName,
              email,
              club_id: invitationData.club_id,
            },
          ]);

        // TODO, HANDLE AVATAR UPLOAD

        if (userProfileData) {
          // Delete the invitation
          // await supabase.from('user_invitations').delete().match({id: invitationData.id});
          console.log('removing invitation');

          revalidatePath('/dashboard', 'layout');
          redirect('/dashboard');
        }
      }
    } else {
      // Delete the invitation from the database
      // await supabase.from('user_invitations').delete().match({id: invitationData.id});
      console.log('removing invitation');

      redirect(`/login?error=${encodeURIComponent('Zaproszenie jest już nieaktualne')}`);
    }
  }

  return {
    success: false,
  };
}
