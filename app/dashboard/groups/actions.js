'use server';

import {redirect} from 'next/navigation';
import {createClient} from '../../../utils/supabase/server';

export async function fetchClubBranchesAndGroups() {
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

  // Get club branches
  const {data: clubBranches, error: clubBranchesError} = await supabase
    .from('club_branches')
    .select()
    .eq('club_id', userData.club_id);

  // Get groups with coach data
  const {data: groups, error: groupsError} = await supabase
    .from('groups')
    .select('*, coaches(*)')
    .eq('club_id', userData.club_id);

  if (groupsError) {
    throw new Error(groupsError.message);
  }

  const clubBranchesAndGroups = clubBranches.map(branch => {
    return {
      id: branch.id,
      title: branch.name,
      groups: groups
        .filter(group => group.club_branch_id === branch.id)
        .map(group => ({
          id: group.id,
          name: group.name,
          color: group.color,
          coach: {
            name: group.coaches.name,
            imgsrc: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
          },
          members: 5,
          openingTimes: 'Pon 18:00 - 20:00',
        })),
    };
  });

  return clubBranchesAndGroups;
}

export async function createNewClubBranch({clubBranchName}) {
  if (!clubBranchName) {
    throw new Error('Club branch name is required');
  }

  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select()
    .eq('id', user.id);

  const {data, error} = await supabase
    .from('club_branches')
    .insert([{name: clubBranchName, club_id: userData[0].club_id}]);
}

export async function removeClubBranch({clubBranchId}) {
  const supabase = createClient();

  const {data, error} = await supabase.from('club_branches').delete().eq('id', clubBranchId);
}

export async function createNewGroup({
  groupName,
  clubBranchId = 'c9b79bba-15ec-4f6b-ba01-41e84ebd3e15',
  color,
  coachId = '76df0cbe-faa1-492d-8ddc-fb8c2186f68b',
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

  const {data: groupData, error: groupError} = await supabase
    .from('groups')
    .insert([
      {
        name: groupName,
        club_id: userData.club_id,
        club_branch_id: clubBranchId,
        color: color,
        coach_id: coachId,
      },
    ])
    .select();

  console.log('groupData', groupData);
  console.log('groupError', groupError);

  redirect(`/dashboard/groups/${groupData[0].id}`);
}

export async function fetchGroupData(groupId) {
  const supabase = createClient();

  const {data: groupData, error: groupError} = await supabase
    .from('groups')
    .select('*, coaches(*), club_branches(*)')
    .eq('id', groupId)
    .single();

  if (groupError) {
    throw new Error(groupError.message);
  }

  return groupData;
}

export async function fetchAvailableCoachesAndClubBranches() {
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

  // Get club branches
  const {data: clubBranches, error: clubBranchesError} = await supabase
    .from('club_branches')
    .select()
    .eq('club_id', userData.club_id);

  // Get coaches
  const {data: coaches, error: coachesError} = await supabase
    .from('coaches')
    .select()
    .eq('club_id', userData.club_id);

  return {clubBranches, coaches};
}
