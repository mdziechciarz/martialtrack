'use server';

// export async function createGroup({
//   clubBranchId = 'c9b79bba-15ec-4f6b-ba01-41e84ebd3e15',
//   name,
//   color,
//   coachId = '76df0cbe-faa1-492d-8ddc-fb8c2186f68b',
// }) {
//   const supabase = createClient();

//   // Get user data
//   const {
//     data: {user},
//   } = await supabase.auth.getUser();

//   // Get user profile data
//   const {data: userData, error: userError} = await supabase
//     .from('users')
//     .select()
//     .eq('id', user.id);

//   const {data, error} = await supabase.from('groups').insert([
//     {
//       name,
//       club_id: userData[0].club_id,
//       club_branch_id: clubBranchId,
//       color,
//       coach_id: coachId,
//     },
//   ]);
// }
