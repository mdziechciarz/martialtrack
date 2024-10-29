'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(email: string, password: string) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    revalidatePath('/login', 'layout')
    redirect(`/login?error=${encodeURIComponent("Nieprawidłowe dane logowania")}`)
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}