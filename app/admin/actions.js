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

/**
 * US-08: Tambah produk baru.
 * Wajib login; validasi nama dan harga di server; simpan ke tabel produk.
 */
export async function tambahProduk(prevState, formData) {
  const supabase = await createSessionClient();

  // Verifikasi sesi admin
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const nama = formData.get("nama")?.trim();
  const harga = Number(formData.get("harga"));
  const kategori = formData.get("kategori")?.trim() || null;
  const foto_url = formData.get("foto_url")?.trim() || null;
  const deskripsi = formData.get("deskripsi")?.trim() || null;

  if (!nama) return { error: "Nama produk tidak boleh kosong." };
  if (!Number.isFinite(harga) || harga < 0) return { error: "Harga harus berupa angka positif." };

  const { error } = await supabase
    .from("produk")
    .insert({ nama, harga, kategori, foto_url, deskripsi });

  if (error) return { error: "Gagal menyimpan produk. Coba lagi." };

  redirect("/admin");
}

/**
 * US-10: Hapus produk berdasarkan ID.
 * Wajib login; setelah berhasil revalidate halaman /admin.
 */
export async function hapusProduk(id) {
  const supabase = await createSessionClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) return { error: "Gagal menghapus produk. Coba lagi." };

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/admin");
}
