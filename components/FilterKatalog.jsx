"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function FilterKatalog({ kategoriList }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => router.replace(`/?${params.toString()}`));
  }

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="search"
        placeholder="Cari produk…"
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => updateParam("q", e.target.value)}
        className="h-9 flex-1 rounded-xl border border-garis bg-latar px-3 text-sm outline-none focus:border-utama min-w-40"
        aria-label="Cari produk"
      />
      <select
        defaultValue={searchParams.get("kategori") ?? ""}
        onChange={(e) => updateParam("kategori", e.target.value)}
        className="h-9 rounded-xl border border-garis bg-latar px-3 text-sm outline-none focus:border-utama"
        aria-label="Filter kategori"
      >
        <option value="">Semua kategori</option>
        {kategoriList.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
    </div>
  );
}
