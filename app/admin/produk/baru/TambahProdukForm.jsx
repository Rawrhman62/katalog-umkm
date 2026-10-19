"use client";

import { useActionState } from "react";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/app/admin/actions";

export default function TambahProdukForm() {
  const [state, formAction, pending] = useActionState(tambahProduk, null);

  return (
    <>
      {state?.error && (
        <p className="text-sm text-bahaya">{state.error}</p>
      )}
      <FormProduk action={formAction} labelTombol={pending ? "Menyimpan…" : "Simpan produk"} />
    </>
  );
}
