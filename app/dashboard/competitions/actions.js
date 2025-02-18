'use server';

import {redirect} from 'next/navigation';
import {createClient} from '../../../utils/supabase/server';

export async function createNewCompetition({
  name,
  color,
  date_start,
  date_end,
  location,
  level,
  description = null,
  link = null,
  participants = [],
}) {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single();

  // Create new competition
  const {data: competitionData, error: competitionError} = await supabase
    .from('competitions')
    .insert([
      {
        club_id: userData.club_id,
        name,
        color,
        date_start,
        date_end,
        location,
        level,
        description,
        link,
      },
    ])
    .select()
    .single();

  if (competitionError) {
    console.log('competitionError', competitionError);
    return {
      error: competitionError,
    };
  }

  // Add participants
  if (participants?.length) {
    const competitionParticipants = participants.map(participant => ({
      competition_id: competitionData.id,
      athlete_id: participant.athlete.id,
      weight: participant.weight,
      height: participant.height,
      is_entry_fee_paid: participant.payment,
      is_consent_form_submitted: participant.consent,
    }));

    const {data: competitionParticipantsData, error: competitionParticipantsError} = await supabase
      .from('competition_participants')
      .insert(competitionParticipants)
      .select();

    if (competitionParticipantsError) {
      return {
        error: competitionParticipantsError,
      };
    }

    let competitionEntries = [];

    participants.forEach(participant => {
      Object.values(participant.categories).forEach(category => {
        competitionEntries.push({
          participant_id: competitionParticipantsData.find(
            competitionParticipant => competitionParticipant.athlete_id === participant.athlete.id
          ).id,
          age_category: category.ageCategory,
          weight_or_height_category: category.weightAndHeightCategory,
          discipline: category.formula,
        });
      });
    });

    const {data: competitionEntriesData, error: competitionEntriesError} = await supabase
      .from('competition_entries')
      .insert(competitionEntries)
      .select();

    if (competitionEntriesError) {
      return {
        error: competitionEntriesError,
      };
    }

    redirect(`/dashboard/competitions/${competitionData.id}`);
  }
}

export async function fetchCompetitions() {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single();

  // Get competitions
  const {data: competitionsData, error: competitionsError} = await supabase
    .from('competitions')
    .select('*, competition_participants(*)')
    .eq('club_id', userData.club_id);

  if (competitionsError) {
    return {
      success: false,
      error: competitionsError,
    };
  }

  return {
    success: true,
    data: competitionsData,
  };
}
