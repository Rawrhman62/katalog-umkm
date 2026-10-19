"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09).
// Nama field sama dengan kolom tabel "produk".
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [nama, setNama] = useState(produk.nama ?? "");
  const [kategori, setKategori] = useState(produk.kategori ?? "");
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi ?? "");
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState(null);

  async function generateDeskripsi() {
    if (!nama.trim()) {
      setErrorAI("Isi nama produk terlebih dahulu.");
      return;
    }
    setLoadingAI(true);
    setErrorAI(null);
    try {
      const res = await fetch("/api/ai-deskripsi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, kategori }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal generate deskripsi.");
      setDeskripsi(data.deskripsi);
    } catch (err) {
      setErrorAI(err.message);
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input
        label="Kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />

      {/* Deskripsi + tombol AI */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Deskripsi</span>
          <button
            type="button"
            onClick={generateDeskripsi}
            disabled={loadingAI}
            className="flex items-center gap-1.5 rounded-lg border border-utama px-3 py-1 text-xs font-semibold text-utama hover:bg-permukaan disabled:opacity-50"
          >
            {loadingAI ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-utama border-t-transparent" />
                Membuat…
              </>
            ) : (
              "✦ Generate dengan AI"
            )}
          </button>
        </div>
        {errorAI && <p className="text-xs text-bahaya">{errorAI}</p>}
        <textarea
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      <div className="flex gap-3">
        <Tombol type="submit">{labelTombol}</Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
