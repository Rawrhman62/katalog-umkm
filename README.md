# Katalog Produk UMKM

Aplikasi web katalog produk untuk usaha kecil dan menengah (UMKM). Pengunjung dapat menelusuri produk, melihat detail, memilih jumlah, dan langsung memesan lewat WhatsApp. Pemilik toko mengelola produk melalui dashboard admin yang terproteksi.

## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions
- **Supabase** — PostgreSQL database + Auth (email & password)
- **Tailwind CSS 4** — styling dengan design token
- **Vercel** — hosting dan deployment

## Fitur Utama

### Katalog Publik
- **US-01** Daftar produk diambil dari Supabase secara server-side, tampil sebagai kartu dengan foto, kategori, nama, dan harga
- **US-11** Pencarian kata kunci (`.ilike`) dan filter kategori via URL query string, diproses di server
- **US-02** Halaman detail produk dengan foto, deskripsi, dan harga; menampilkan 404 jika produk tidak ditemukan
- **US-03** Tombol "Pesan via WhatsApp" dengan pesan otomatis berisi nama dan harga produk
- **US-12** Pemilih jumlah (quantity) pada halaman detail; jumlah ikut tercantum di pesan WhatsApp

### Dashboard Admin
- **US-04** Login admin dengan Supabase Auth (email & password), diproses via Server Action + cookie (`@supabase/ssr`); tombol Keluar mengakhiri sesi
- **US-05** Ganti password dengan validasi server (minimal 8 karakter, harus cocok dengan konfirmasi)
- **US-06** Semua rute `/admin` (kecuali `/admin/login`) diproteksi oleh `proxy.js`; setiap aksi pengubahan data memverifikasi sesi di server
- **US-07** Daftar produk di halaman admin diambil langsung dari database
- **US-08** Form tambah produk baru dengan validasi server; data disimpan ke Supabase
- **US-09** Form ubah produk; data lama terisi otomatis, perubahan disimpan ke Supabase
- **US-10** Hapus produk dengan dialog konfirmasi; tabel diperbarui otomatis via `revalidatePath`

### Fitur Pendukung
- **US-13** PWA — manifest terkonfigurasi, aplikasi dapat diinstal di perangkat mobile maupun desktop
- **US-14** Generator deskripsi produk berbasis AI (Gemini API); tombol "Generate dengan AI" di form produk mengisi kolom deskripsi secara otomatis

## Instalasi & Konfigurasi

### 1. Kloning repositori

```bash
git clone <url-repositori>
cd katalog-umkm
```

### 2. Instal dependensi

```bash
npm install
```

### 3. Konfigurasi environment variable

Salin `.env.example` menjadi `.env.local` lalu isi nilainya:

```bash
cp .env.example .env.local
```

```env
# Supabase — Project Settings > API
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJ...   # anon/public key
SUPABASE_SECRET_KEY=eyJ...        # service_role key

# AI — https://aistudio.google.com/app/apikey
AI_API_KEY=
```

> Variabel yang sama perlu ditambahkan di Vercel: **Project > Settings > Environment Variables**.

### 4. Siapkan database

Jalankan skrip SQL di `docs/schema.sql` melalui Supabase SQL Editor untuk membuat tabel `produk` dan mengaktifkan Row Level Security.

### 5. Jalankan server pengembangan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Struktur Proyek

```
app/
  page.jsx                      # Katalog publik (US-01, US-11)
  produk/[id]/page.jsx          # Detail produk (US-02, US-03, US-12)
  admin/
    login/page.jsx              # Halaman login (US-04)
    page.jsx                    # Daftar produk admin (US-07)
    password/page.jsx           # Ganti password (US-05)
    produk/baru/page.jsx        # Tambah produk (US-08)
    produk/[id]/ubah/page.jsx   # Ubah produk (US-09)
    actions.js                  # Semua Server Action admin
  api/ai-deskripsi/route.js     # Route Handler generate deskripsi AI (US-14)
  layout.jsx                    # Root layout + metadata PWA
  manifest.js                   # Web App Manifest (US-13)

components/
  KartuProduk.jsx               # Kartu produk di katalog
  TabelProduk.jsx               # Tabel produk di dashboard admin
  FormProduk.jsx                # Form tambah/ubah produk + tombol AI
  FilterKatalog.jsx             # Input pencarian & dropdown kategori
  PemesanProduk.jsx             # Pemilih jumlah + tombol WhatsApp
  NavAdmin.jsx                  # Navigasi dashboard admin
  TombolHapus.jsx               # Tombol hapus dengan konfirmasi
  TombolWhatsApp.jsx            # Tombol pesan WhatsApp
  Input.jsx / Tombol.jsx        # Komponen UI dasar

lib/
  supabase/server.js            # Client Supabase dengan service role key
  supabase/session.js           # Client Supabase berbasis cookie (admin)
  toko.js                       # Identitas toko (nama, WhatsApp, dll.)
  format.js                     # Utilitas format Rupiah

proxy.js                        # Middleware proteksi rute /admin (US-06)
docs/
  schema.sql                    # Skema database Supabase
  PRD.md / user-stories.md      # Dokumen produk
```

## Akun Admin

Akun admin dibuat langsung dari dashboard Supabase Authentication — bukan dari halaman daftar di aplikasi (pendaftaran publik dimatikan). Setelah pertama login, segera ganti password bawaan melalui halaman `/admin/password`.
