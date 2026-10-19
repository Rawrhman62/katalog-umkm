"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { login } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input label="Email" name="email" type="email" autoComplete="email" required />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      {state?.error && (
        <p className="text-sm text-bahaya">{state.error}</p>
      )}
      <Tombol type="submit" disabled={pending}>
        {pending ? "Memproses…" : "Masuk"}
      </Tombol>
    </form>
  );
}
