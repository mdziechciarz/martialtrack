'use server';

import {createClient} from '@/utils/supabase/server';
import crypto from 'crypto';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

// TODO
// Handle user already exists

// Function to hash a token using SHA-256
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function registerAdminUser({fullName, email, password, token}) {
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
      const {
        data: {user},
        error: userAuthError,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (user) {
        // Create user profile
        const {data: userProfileData, error: userProfileError} = await supabase
          .from('users')
          .insert([
            {
              id: user.id,
              full_name: fullName,
              email,
              club_id: invitationData.club_id,
            },
          ])
          .select()
          .single();

        // TODO, HANDLE AVATAR UPLOAD

        if (!userProfileError) {
          // Delete the invitation after the user has been created
          await supabase.from('user_invitations').delete().match({id: invitationData.id});

          revalidatePath('/dashboard', 'layout');
          redirect('/dashboard');
        }
      }
    } else {
      // Delete the invitation from the database since it's no longer valid
      await supabase.from('user_invitations').delete().match({id: invitationData.id});

      redirect(`/login?error=${encodeURIComponent('Zaproszenie jest już nieaktualne')}`);
    }
  }

  return {
    success: false,
  };
}

// registerCoachUser({userData, coachProfileData, token}) {}
