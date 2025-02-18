'use server';

import {createClient} from '@/utils/supabase/server';
import twilio from 'twilio';

export async function sendSMSMessage({recipients = [], message}) {
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

  let athleteIds = [];
  let coachIds = [];
  let recipientPhoneNumbers = [];

  // Athletes
  if (recipients.filter(r => r.type === 'athlete').length > 0) {
    const {data: athletes, error: athletesError} = await supabase
      .from('athletes')
      .select('phone_number')
      .in(
        'id',
        recipients.filter(r => r.type === 'athlete').map(r => r.id)
      );

    if (athletes) {
      athleteIds = recipients.filter(r => r.type === 'athlete').map(r => r.id);
      recipientPhoneNumbers = recipientPhoneNumbers.concat(athletes.map(a => a.phone_number));
    }
  }

  // Coaches
  if (recipients.filter(r => r.type === 'coach').length > 0) {
    const {data: coaches, error: coachesError} = await supabase
      .from('coaches')
      .select('phone_number')
      .in(
        'id',
        recipients.filter(r => r.type === 'coach').map(r => r.id)
      );

    if (coaches) {
      coachIds = recipients.filter(r => r.type === 'coach').map(r => r.id);
      recipientPhoneNumbers = recipientPhoneNumbers.concat(coaches.map(c => c.phone_number));
    }
  }

  // Competition participants
  if (recipients.filter(r => r.type === 'competition').length > 0) {
    const {data: competitionParticipants, error: competitionParticipantsError} = await supabase
      .from('competition_participants')
      .select('*, athletes(id, phone_number)')
      .in(
        'competition_id',
        recipients.filter(r => r.type === 'competition').map(r => r.id)
      );

    if (competitionParticipants) {
      recipientPhoneNumbers = recipientPhoneNumbers.concat(
        competitionParticipants.map(cp => cp.athletes.phone_number)
      );
      athleteIds = athleteIds.concat(competitionParticipants.map(cp => cp.athletes.id));
    }
  }

  // Group members
  if (recipients.filter(r => r.type === 'group').length > 0) {
    const {data: groupMembers, error: groupMembersError} = await supabase
      .from('group_members')
      .select('*, athletes(id, phone_number)')
      .in(
        'group_id',
        recipients.filter(r => r.type === 'group').map(r => r.id)
      );

    if (groupMembers) {
      recipientPhoneNumbers = recipientPhoneNumbers.concat(
        groupMembers.map(gm => gm.athletes.phone_number)
      );
      athleteIds = athleteIds.concat(groupMembers.map(gm => gm.athletes.id));
    }
  }

  // Twilio

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  // const messageContent = message + '\n\n' + userData.clubs.name
  const messageContent = '.\n\n' + message + '\n\n' + userData.clubs.name;

  for (const phoneNumber of recipientPhoneNumbers) {
    const response = await client.messages.create({
      body: messageContent,
      from: process.env.TWILIO_PHONE_NUMBER,
      // from: 'ESPORTIVO',
      to: phoneNumber,
    });

    // if successful, save message to database
    if (response.sid) {
      // Save message to database
      const {data: messageData, error: messageError} = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            type: 'sms',
            content: message,
            status: 'sent',
          },
        ])
        .select()
        .single();

      const recipientsDataToInsert = [
        ...athleteIds.map(a => ({athlete_id: a, message_id: messageData.id, type: 'athlete'})),
        ...coachIds.map(c => ({coach_id: c, message_id: messageData.id, type: 'coach'})),
      ];

      if (recipientsDataToInsert.length > 0) {
        await supabase.from('message_recipients').insert(recipientsDataToInsert);
      }

      return {
        success: true,
      };
    }
  }

  return {
    success: false,
  };
}

export async function scheduleSMSMessage({recipients = [], message, scheduledAt}) {
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

  let athleteIds = [];
  let coachIds = [];
  let recipientPhoneNumbers = [];

  // Athletes
  if (recipients.filter(r => r.type === 'athlete').length > 0) {
    const {data: athletes, error: athletesError} = await supabase
      .from('athletes')
      .select('phone_number')
      .in(
        'id',
        recipients.filter(r => r.type === 'athlete').map(r => r.id)
      );

    if (athletes) {
      athleteIds = recipients.filter(r => r.type === 'athlete').map(r => r.id);
      recipientPhoneNumbers = recipientPhoneNumbers.concat(athletes.map(a => a.phone_number));
    }
  }

  // Coaches
  if (recipients.filter(r => r.type === 'coach').length > 0) {
    const {data: coaches, error: coachesError} = await supabase
      .from('coaches')
      .select('phone_number')
      .in(
        'id',
        recipients.filter(r => r.type === 'coach').map(r => r.id)
      );

    if (coaches) {
      coachIds = recipients.filter(r => r.type === 'coach').map(r => r.id);
      recipientPhoneNumbers = recipientPhoneNumbers.concat(coaches.map(c => c.phone_number));
    }
  }

  // Competition participants
  if (recipients.filter(r => r.type === 'competition').length > 0) {
    const {data: competitionParticipants, error: competitionParticipantsError} = await supabase
      .from('competition_participants')
      .select('*, athletes(id, phone_number)')
      .in(
        'competition_id',
        recipients.filter(r => r.type === 'competition').map(r => r.id)
      );

    if (competitionParticipants) {
      recipientPhoneNumbers = recipientPhoneNumbers.concat(
        competitionParticipants.map(cp => cp.athletes.phone_number)
      );
      athleteIds = athleteIds.concat(competitionParticipants.map(cp => cp.athletes.id));
    }
  }

  // Group members
  if (recipients.filter(r => r.type === 'group').length > 0) {
    const {data: groupMembers, error: groupMembersError} = await supabase
      .from('group_members')
      .select('*, athletes(id, phone_number)')
      .in(
        'group_id',
        recipients.filter(r => r.type === 'group').map(r => r.id)
      );

    if (groupMembers) {
      recipientPhoneNumbers = recipientPhoneNumbers.concat(
        groupMembers.map(gm => gm.athletes.phone_number)
      );
      athleteIds = athleteIds.concat(groupMembers.map(gm => gm.athletes.id));
    }
  }

  // Save message to database
  const {data: messageData, error: messageError} = await supabase
    .from('messages')
    .insert([
      {
        sender_id: user.id,
        type: 'sms',
        content: message,
        status: 'scheuled',
        scheduled_at: scheduledAt,
      },
    ])
    .select()
    .single();

  const recipientsDataToInsert = [
    ...athleteIds.map(a => ({athlete_id: a, message_id: messageData.id, type: 'athlete'})),
    ...coachIds.map(c => ({coach_id: c, message_id: messageData.id, type: 'coach'})),
  ];

  if (recipientsDataToInsert.length > 0) {
    await supabase.from('message_recipients').insert(recipientsDataToInsert);
  }
  if (messageData && recipientsDataToInsert) {
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
}

export async function fetchMessages() {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*, clubs(*)')
    .eq('id', user.id)
    .single();

  // Get messages where sender.club_id = user.club_id
  const {data: messages, error: messagesError} = await supabase
    .from('messages')
    .select('*, sender:users(*), message_recipients(type, athlete:athletes(*), coach:coaches(*))')
    .eq('sender.club_id', userData.clubs.id);

  console.log('messages', messages);

  console.log('messagesError', messagesError);

  if (messages) {
    return {
      success: true,
      data: messages,
    };
  }

  return {
    success: false,
  };
}

export async function removeMessage({id}) {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*, clubs(*)')
    .eq('id', user.id)
    .single();

  // Remove message where message.id = id
  const {data: message, error: messageError} = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  // Remove message recipients where message_id = id
  const {data: messageRecipients, error: messageRecipientsError} = await supabase
    .from('message_recipients')
    .delete()
    .eq('message_id', id);

  if (message && messageRecipients) {
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
}
