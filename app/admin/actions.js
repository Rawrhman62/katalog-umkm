"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";

/**
 * US-04: Login admin dengan email dan password.
 * Diproses di server; login berhasil → /admin, gagal → pesan error.
 */
export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau password salah. Coba lagi." };
  }

  redirect("/admin");
}

/**
 * US-04: Logout admin — akhiri sesi lalu kembali ke halaman login.
 */
export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * US-05: Ganti password admin yang sedang login.
 * Validasi di server: minimal 8 karakter dan harus cocok dengan konfirmasi.
 */
export async function gantiPassword(prevState, formData) {
  const passwordBaru = formData.get("password_baru");
  const konfirmasi = formData.get("konfirmasi_password");

  if (!passwordBaru || passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasi) {
    return { error: "Password baru dan konfirmasi tidak sama." };
  }

  const supabase = await createSessionClient();

  // Pastikan admin sudah login
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/admin/login");
  }

  const { error } = await supabase.auth.updateUser({ password: passwordBaru });

  if (error) {
    return { error: "Gagal mengganti password. Coba lagi." };
  }

  return { sukses: "Password berhasil diganti." };
}
