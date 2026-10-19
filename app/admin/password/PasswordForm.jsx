"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { gantiPassword } from "@/app/admin/actions";

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(gantiPassword, null);

  return (
    <form action={formAction} className="flex max-w-sm flex-col gap-4">
      <Input
        label="Password baru"
        name="password_baru"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      <Input
        label="Ulangi password baru"
        name="konfirmasi_password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      {state?.error && (
        <p className="text-sm text-bahaya">{state.error}</p>
      )}
      {state?.sukses && (
        <p className="text-sm text-hijau">{state.sukses}</p>
      )}
      <Tombol type="submit" disabled={pending} className="self-start">
        {pending ? "Menyimpan…" : "Simpan password"}
      </Tombol>
    </form>
  );
}
