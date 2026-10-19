import { NextResponse } from "next/server";

export async function POST(request) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI_API_KEY belum diisi." }, { status: 500 });
  }

  const { nama, kategori } = await request.json();
  if (!nama) {
    return NextResponse.json({ error: "Nama produk wajib diisi." }, { status: 400 });
  }

  const prompt = `Buatkan deskripsi produk yang menarik dan persuasif dalam Bahasa Indonesia untuk produk UMKM berikut:
Nama: ${nama}
Kategori: ${kategori || "Umum"}

Deskripsi harus singkat (2–3 kalimat), menonjolkan keunggulan produk, dan mengundang pembeli untuk memesan. Jangan gunakan bullet point. Tulis langsung deskripsinya tanpa kalimat pembuka seperti "Berikut deskripsinya:".`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err?.error?.message || "Gagal menghubungi API AI." },
      { status: res.status }
    );
  }

  const json = await res.json();
  const deskripsi = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!deskripsi) {
    return NextResponse.json({ error: "AI tidak menghasilkan teks." }, { status: 500 });
  }

  return NextResponse.json({ deskripsi });
}
