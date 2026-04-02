import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Demo mode: skip auth entirely when ?demo=true
  const isDemo = request.nextUrl.searchParams.get("demo") === "true";
  if (isDemo) {
    // Set a demo cookie so subsequent navigations stay in demo mode
    supabaseResponse.cookies.set("pedihealth-demo", "true", { path: "/" });
    return supabaseResponse;
  }
  const hasDemoCookie = request.cookies.get("pedihealth-demo")?.value === "true";
  if (hasDemoCookie) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes: redirect to login if not authenticated
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname === "/";

  if (!user && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If authenticated user visits login page, redirect based on role
  if (user && isAuthPage) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const url = request.nextUrl.clone();
    if (profile?.role === "doctor") {
      url.pathname = "/doctor/dashboard";
    } else {
      url.pathname = "/dashboard";
    }
    return NextResponse.redirect(url);
  }

  // Role-based access control
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isDoctor = profile?.role === "doctor";
    const isDoctorRoute = request.nextUrl.pathname.startsWith("/doctor");

    if (isDoctorRoute && !isDoctor) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (!isDoctorRoute && isDoctor && !isAuthPage) {
      // Doctor trying to access parent routes
      const parentRoutes = ["/dashboard", "/growth", "/visits", "/injections", "/labs", "/education", "/settings"];
      if (parentRoutes.some((r) => request.nextUrl.pathname.startsWith(r))) {
        const url = request.nextUrl.clone();
        url.pathname = "/doctor/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
