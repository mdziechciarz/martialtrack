'use server';
import {createClient} from '@/utils/supabase/server';
import crypto from 'crypto';
import twilio from 'twilio';

// Function to generate a secure token
function generateToken() {
  // Generates 32 random bytes and converts them to a hexadecimal string (64 characters)
  return crypto.randomBytes(32).toString('hex');
}

// Function to hash a token using SHA-256
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function compareTokens(token, hashedToken) {
  return hashToken(token) === hashedToken;
}

async function sendEmail({email, token}) {
  // Send an email to the user with the token
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  // const messageContent = message + '\n\n' + userData.clubs.name
  const messageContent = '.\n\n' + token;

  const response = await client.messages.create({
    body: messageContent,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+48577269394',
  });

  return response;
}

export async function inviteNewUser({email, role}) {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*, clubs(*)')
    .eq('id', user.id)
    .single();

  // Generate a token
  const token = generateToken();

  // Hash the token
  const hashedToken = hashToken(token);

  // Save the token to the database
  const {data: invitationData, error: invitationError} = await supabase
    .from('user_invitations')
    .insert([
      {
        email,
        hashed_token: hashedToken,
        role,
        inviter_id: user.id,
        club_id: userData.clubs.id,
        valid_until: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 72 hours from now
      },
    ])
    .select();

  console.log('invitationData', invitationData);
  console.log('invitationError', invitationError);

  if (invitationData) {
    // Send an email to the user with the token
    const response = await sendEmail({email, token});

    if (response.sid)
      return {
        success: true,
      };
    else {
      // Delete the invitation from the database
      // await supabase.from('user_invitations').delete().match({id: invitationData.id});

      return {
        success: false,
      };
    }
  }

  return {
    success: false,
  };
}

export async function validateInvitation({token}) {
  const supabase = createClient();

  // Get the invitation data
  const {data: invitationData, error: invitationError} = await supabase
    .from('user_invitations')
    .select('*')
    .eq('hashed_token', hashToken(token))
    .single();

  if (invitationData) {
    // Check if the token is still valid
    if (new Date(invitationData.valid_until) > new Date()) {
      return {
        success: true,
        data: invitationData,
      };
    } else {
      // Delete the invitation from the database
      await supabase.from('user_invitations').delete().match({id: invitationData.id});

      return {
        success: false,
      };
    }
  }

  return {
    success: false,
  };
}
