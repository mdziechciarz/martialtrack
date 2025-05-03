'use server';

import {createClient} from '@/utils/supabase/server';

export async function getAthleteData(id) {
  try {
    const supabase = createClient();

    const {data: athleteData, error: athleteError} = await supabase
      .from('athletes')
      .select(
        `
        *,
        group_members (
          groups (*, coach: coaches(full_name), group_schedules(*))
        ),
        orders(*),
        membership_payments (*),
        athlete_membership_settings (
          *,
          membership_plan: membership_plans (*)
        )
      `
      )
      .eq('id', id)
      // .eq('athlete_membership_settings.active', true)
      .single();

    if (athleteError || !athleteData) {
      console.error('Error fetching athlete data:', athleteError);
      throw new Error(athleteError);
    }

    // Restructure the data to have groups directly under athlete
    const athlete = {
      ...athleteData,
      groups: athleteData.group_members.map(member => member.groups),
      // Extract the single membership setting from the array
      // membership_settings: athleteData?.athlete_membership_settings?.[0] || null,
    };

    // Remove the nested group_members structure if no longer needed
    delete athlete.group_members;
    // Remove the array of membership settings since we now have it as a direct property
    // delete athlete.athlete_membership_settings;

    return {
      success: true,
      data: athlete,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Fetching athlete data failed.',
    };
  }
}
