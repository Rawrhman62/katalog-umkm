import { createServerClient as createSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Membuat client Supabase berbasis cookie untuk sesi admin.
 * Memakai SUPABASE_PUBLISHABLE_KEY (bukan secret key) bersama @supabase/ssr.
 */
export async function createSessionClient() {
  const cookieStore = await cookies();

  return createSSRClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll dipanggil dari Server Component — tidak masalah jika diabaikan
          }
        },
      },
    }
  );
}
