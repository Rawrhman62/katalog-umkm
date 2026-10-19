"use client";

import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    function handler(e) {
      e.preventDefault();
      setPromptEvent(e);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!promptEvent) return;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="banner"
      className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-garis bg-latar p-4 shadow-lg"
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold">Pasang di perangkatmu</p>
        <p className="text-xs text-teks-lembut">Akses katalog lebih cepat tanpa browser.</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-teks-lembut hover:bg-permukaan"
        >
          Nanti
        </button>
        <button
          type="button"
          onClick={handleInstall}
          className="rounded-lg bg-utama px-3 py-1.5 text-xs font-semibold text-white hover:bg-utama-gelap"
        >
          Pasang
        </button>
      </div>
    </div>
  );
}
