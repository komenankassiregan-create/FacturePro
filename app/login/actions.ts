'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      redirect('/login?error=Veuillez confirmer votre adresse email avant de vous connecter.')
    }
    redirect('/login?error=Email ou mot de passe incorrect.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const companyName = formData.get('companyName') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;

  if (password !== passwordConfirm) {
    redirect('/login?error=Les mots de passe ne correspondent pas.')
  }

  const data = {
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      }
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  // Insert company settings
  if (authData.user) {
    await supabase.from('company_settings').insert({
      user_id: authData.user.id,
      company_name: companyName,
      phone: phone,
      email: email,
    })
  }

  // If email confirmation is enabled, session will be null
  if (authData.user && !authData.session) {
    redirect('/login?message=Compte créé avec succès ! Veuillez vérifier vos emails pour confirmer votre inscription.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
