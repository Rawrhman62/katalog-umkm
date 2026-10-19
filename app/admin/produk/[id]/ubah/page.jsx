import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import UbahProdukForm from "./UbahProdukForm";
import { createServerClient } from "@/lib/supabase/server";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;

  const supabase = createServerClient();
  const { data: produk } = await supabase
    .from("produk")
    .select("id, nama, harga, kategori, foto_url, deskripsi")
    .eq("id", id)
    .single();

  if (!produk) notFound();

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <UbahProdukForm produk={produk} />
    </div>
  );
}
