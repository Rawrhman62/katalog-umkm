import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diisi di environment variable."
    );
  }

  // Normalisasi URL jika terdapat akhiran /rest/v1 atau slash berlebih
  const cleanUrl = url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return { url: cleanUrl, key };
}

/**
 * Membuat client Supabase sisi server dengan SUPABASE_SECRET_KEY (service role)
 * untuk membaca data publik melewati aturan RLS.
 */
export function createServerClient() {
  const { url, key } = getSupabaseConfig();

  return createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Alias createClient agar fleksibel bagi pemanggil
export const createClient = createServerClient;

// Singleton client dengan lazy initialization
let instance = null;

export function getSupabase() {
  if (!instance) {
    instance = createServerClient();
  }
  return instance;
}

// Proxy agar pemanggil dapat langsung memakai: import { supabase } from "@/lib/supabase"
export const supabase = new Proxy(
  {},
  {
    get(target, prop) {
      const client = getSupabase();
      const value = client[prop];
      if (typeof value === "function") {
        return value.bind(client);
      }
      return value;
    },
  }
);

export default supabase;

