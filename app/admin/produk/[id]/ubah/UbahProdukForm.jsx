"use client";

import { useActionState } from "react";
import { ubahProduk } from "@/app/admin/actions";
import FormProduk from "@/components/FormProduk";

export default function UbahProdukForm({ produk }) {
  const actionDenganId = ubahProduk.bind(null, produk.id);
  const [state, formAction, pending] = useActionState(actionDenganId, null);

  return (
    <>
      {state?.error && (
        <p className="text-sm text-bahaya">{state.error}</p>
      )}
      <FormProduk
        produk={produk}
        action={formAction}
        labelTombol={pending ? "Menyimpan…" : "Simpan perubahan"}
      />
    </>
  );
}
