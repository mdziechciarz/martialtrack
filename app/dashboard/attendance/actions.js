'use server';

import {createClient} from '@/utils/supabase/server';

// Fetch class occurrences for a specific date range (past and today)
export async function fetchClassOccurrences(startDate, endDate) {
  const supabase = createClient();

  const {data, error} = await supabase
    .from('class_occurrences')
    .select(
      `
      id, 
      date, 
      start_time, 
      end_time, 
      description, 
      status,
      group_id,
      groups(id, name, color, club_id),
      class_attendance(id, athlete_id, is_present)
    `
    )
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', {ascending: true})
    .order('start_time', {ascending: true});

  if (error) {
    console.error('Error fetching class occurrences:', error);
    return [];
  }

  console.log(data);

  return data || [];
}

// Fetch group schedules (for future classes)
export async function fetchGroupSchedules() {
  const supabase = createClient();

  const {data, error} = await supabase
    .from('group_schedules')
    .select(
      `
      id, 
      day_of_week, 
      start_time, 
      end_time,
      group_id,
      groups(id, name, color, club_id)
    `
    )
    .order('day_of_week', {ascending: true})
    .order('start_time', {ascending: true});

  if (error) {
    console.error('Error fetching group schedules:', error);
    return [];
  }
  return data || [];
}
