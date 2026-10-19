"use client";

import { useState } from "react";
import { hapusProduk } from "@/app/admin/actions";

export default function TombolHapus({ id, nama }) {
  const [error, setError] = useState(null);

  async function handleHapus() {
    if (!confirm(`Hapus produk "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setError(null);
    const hasil = await hapusProduk(id);
    if (hasil?.error) setError(hasil.error);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleHapus}
        className="rounded-xl border border-bahaya px-3 py-1.5 text-sm font-semibold text-bahaya hover:bg-bahaya hover:text-white transition-colors"
      >
        Hapus
      </button>
      {error && <p className="text-xs text-bahaya">{error}</p>}
    </div>
  );
}
