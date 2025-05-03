'use server';

import {createClient} from '@/utils/supabase/server';

export async function getCoachData(id) {
  try {
    const supabase = createClient();

    const {data: coachData, error: coachError} = await supabase
      .from('coaches')
      .select(
        `
        *,
        groups (*, coach: coaches (*), group_schedules (*)),
        group_assistants (
          *,
          groups (*, coach: coaches (*), group_schedules (*))
        )
      `
      )
      .eq('id', id)
      .single();

    if (coachError || !coachData) {
      console.error('Error fetching athlete data:', coachError);
      throw new Error(coachError);
    }

    // Restructure the data to have groups directly under athlete
    const coach = {
      ...coachData,
      groups_as_coach: coachData.groups,
      groups_as_assistant: coachData.group_assistants.map(assistant => assistant.groups),
    };

    delete coach.group_assistants;
    delete coach.groups;

    return {
      success: true,
      data: coach,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Fetching athlete data failed.',
    };
  }
}
