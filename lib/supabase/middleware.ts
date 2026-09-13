import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Rafraîchir la session si nécessaire
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protection des routes: si non connecté et essai d'accéder au dashboard
  const isDashboardRoute = 
    request.nextUrl.pathname.startsWith('/invoices') || 
    request.nextUrl.pathname.startsWith('/clients') || 
    request.nextUrl.pathname.startsWith('/settings') ||
    request.nextUrl.pathname === '/dashboard';

  if (!user && isDashboardRoute) {
    // Rediriger vers login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
