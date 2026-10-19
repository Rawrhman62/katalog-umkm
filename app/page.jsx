import KartuProduk from "@/components/KartuProduk";
import FilterKatalog from "@/components/FilterKatalog";
import { createServerClient } from "@/lib/supabase";
import { toko } from "@/lib/toko";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const { q, kategori } = await searchParams;

  const supabase = createServerClient();

  // Ambil semua kategori untuk dropdown (dari seluruh produk tanpa filter)
  const { data: semuaProduk } = await supabase.from("produk").select("kategori");
  const kategoriList = [...new Set((semuaProduk ?? []).map((p) => p.kategori).filter(Boolean))].sort();

  // Query produk dengan filter aktif
  let query = supabase.from("produk").select("*").order("id", { ascending: true });
  if (q) query = query.ilike("nama", `%${q}%`);
  if (kategori) query = query.eq("kategori", kategori);

  const { data, error } = await query;
  const daftarProduk = data ?? [];

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>

        <FilterKatalog kategoriList={kategoriList} />

        {error ? (
          <div
            role="alert"
            className="rounded-xl border border-garis bg-permukaan p-4 text-sm text-bahaya"
          >
            Gagal mengambil data produk: {error.message}
          </div>
        ) : daftarProduk.length === 0 && !q && !kategori ? (
          <p className="py-8 text-center text-teks-lembut">Belum ada produk</p>
        ) : daftarProduk.length === 0 ? (
          <p className="py-8 text-center text-teks-lembut">Produk tidak ditemukan</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
