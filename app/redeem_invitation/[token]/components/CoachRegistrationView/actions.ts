'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/server'


export async function signUpNewClub({
  email, password, clubName
}) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userSignUpData = {
    email, password
  }
  console.log("Called signUpNewClub")

  const { error: userError } = await supabase.auth.signUp(userSignUpData)

  const { data, error: clubError } = await supabase
  .from('clubs')
  .insert([{ "club_name": clubName}])



  if (userError || clubError) {
    console.log("userError:", userError)
    console.log("clubError:", clubError)
    
    redirect('/error')
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}