"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function PemesanProduk({ produk }) {
  const [jumlah, setJumlah] = useState(1);

  const nomor = (toko.nomorWhatsApp || "").replace(/\D/g, "");
  const pesan = `Halo, saya ingin memesan ${produk.nama} (${formatRupiah(produk.harga)}) sebanyak ${jumlah} pcs.`;
  const urlWhatsApp = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Pemilih jumlah */}
      <div className="flex items-center gap-3">
        <label htmlFor="jumlah" className="text-sm font-semibold">
          Jumlah
        </label>
        <div className="flex items-center overflow-hidden rounded-xl border border-garis">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            onClick={() => setJumlah((j) => Math.max(1, j - 1))}
            className="px-3 py-2 text-lg font-bold hover:bg-permukaan disabled:opacity-40"
            disabled={jumlah <= 1}
          >
            −
          </button>
          <input
            id="jumlah"
            type="number"
            min={1}
            value={jumlah}
            onChange={(e) => setJumlah(Math.max(1, Number(e.target.value) || 1))}
            className="w-12 bg-transparent py-2 text-center text-sm font-semibold outline-none"
          />
          <button
            type="button"
            aria-label="Tambah jumlah"
            onClick={() => setJumlah((j) => j + 1)}
            className="px-3 py-2 text-lg font-bold hover:bg-permukaan"
          >
            +
          </button>
        </div>
      </div>

      {/* Tombol WhatsApp */}
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
