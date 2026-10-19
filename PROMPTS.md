# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**

**Perbaikan:**

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**

**Perbaikan:**
fix: hapus dependency @next/swc-win32-x64-msvc untuk build linux vercel

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**

**Perbaikan:**

## US-07 List produk di halaman admin dari database **[SENDIRI]**

**Prompt:**
Ubah app/admin/page.jsx supaya menampilkan daftar produk yang diambil langsung dari tabel "produk" di Supabase secara server-side menggunakan koneksi Supabase di lib/supabase. Tampilkan informasi produk meliputi foto/gambar, nama, harga (dalam format Rupiah Rp), stok, dan kategori ke dalam komponen tabel/daftar admin yang sudah ada. Sediakan tombol aksi "Ubah" (mengarahkan ke /admin/produk/[id]) dan "Hapus" pada setiap baris produk. Jika tabel kosong, tampilkan teks "Belum ada produk". Hapus komponen CatatanBelumAktif dari halaman ini tanpa mengubah layout dan styling UI pendukung lainnya.

**Hasil:**

**Perbaikan:**

## US-08 Tambah produk (harus terkunci login) **[SENDIRI]**

**Prompt:**
Baca AGENTS.md bagian aturan keamanan.

Buat fitur tambah produk baru di halaman app/admin/produk/tambah/page.jsx menggunakan Server Action di app/admin/actions.js. Server Action wajib memverifikasi sesi login admin di server terlebih dahulu sebelum menyimpan data ke tabel "produk" di Supabase. Lakukan validasi input di server: nama produk tidak boleh kosong, harga harus berupa angka positif, dan stok minimal 0. Jika validasi gagal atau sesi tidak valid, tampilkan pesan error yang jelas di halaman. Jika berhasil, alihkan pengguna kembali ke /admin dengan menyegarkan data. Hapus CatatanBelumAktif dari halaman ini tanpa mengubah tampilan form yang ada.

**Hasil:**

**Perbaikan:**

## US-09 Ubah produk (harus terkunci login) **[SENDIRI]**

**Prompt:**
Baca AGENTS.md bagian aturan keamanan.

Ubah app/admin/produk/[id]/page.jsx agar mengambil data awal produk dari tabel "produk" Supabase berdasarkan ID dari URL secara server-side. Jika produk tidak ditemukan, panggil notFound(). Buat Server Action untuk update data produk di app/admin/actions.js yang wajib memverifikasi sesi login admin di server. Validasi input (nama, harga, stok) di server sebelum memperbarui Supabase. Tampilkan pesan error jika proses update gagal. Setelah berhasil diubah, alihkan pengguna kembali ke /admin. Hapus CatatanBelumAktif dari halaman ini tanpa mengubah tampilan UI.

**Hasil:**

**Perbaikan:**

## US-10 Hapus produk (harus terkunci login) **[SENDIRI]**

**Prompt:**
Baca AGENTS.md bagian aturan keamanan.

Buat Server Action untuk menghapus produk di app/admin/actions.js. Server Action wajib mengecek sesi login admin di server sebelum menghapus baris dari tabel "produk" di Supabase berdasarkan ID produk. Sambungkan tindakan ini ke tombol "Hapus" di halaman daftar produk admin (app/admin/page.jsx). Berikan konfirmasi dialog (misal confirm()) sebelum pemanggilan dilakukan. Setelah produk berhasil dihapus, panggil revalidatePath('/admin') untuk memperbarui tampilan tabel secara otomatis. Tampilkan pesan error jika proses penghapusan gagal.

**Hasil:**

**Perbaikan:**

## US-11 Filter kategori atau pencarian **[SENDIRI]**

**Prompt:**
Tambahkan fitur pencarian kata kunci dan filter kategori pada katalog produk di app/page.jsx. Manfaatkan Next.js searchParams untuk menangani query pencarian dan filter kategori secara server-side melalui Supabase (gunakan .ilike('nama', ...) untuk pencarian dan .eq('kategori', ...) untuk filter kategori). Buat atau perbarui komponen input pencarian dan dropdown kategori agar memperbarui URL query string saat terjadi perubahan input. Jika query/filter tidak menghasilkan produk, tampilkan tulisan "Produk tidak ditemukan".

**Hasil:**

**Perbaikan:**

## US-12 Pilih jumlah atau varian **[SENDIRI]**

**Prompt:**
Tambahkan kontrol pemilih jumlah (quantity) dan opsi varian (seperti ukuran atau warna, jika kolom/data varian tersedia) pada halaman detail produk app/produk/[id]/page.jsx. Sesuaikan komponen TombolWhatsApp.jsx agar menerima state jumlah dan varian yang dipilih, lalu sertakan detail tersebut ke dalam teks pesan WhatsApp yang di-encode (wa.me). Contoh format pesan: "Halo, saya ingin memesan [Nama Produk] (Varian: [Varian]) sebanyak [Jumlah] pcs". Pertahankan desain dan styling tombol yang sudah ada.

**Hasil:**

**Perbaikan:**

## US-13 Bisa di-install di HP (PWA) **[SENDIRI]**

**Prompt:**
Konfigurasikan aplikasi Next.js agar mendukung Progressive Web App (PWA). Buat file app/manifest.js (atau public/manifest.json) yang memuat konfigurasi name, short_name, start_url: '/', display: 'standalone', background_color, theme_color, serta opsi icon (minimal ukuran 192x192 dan 512x512). Hubungkan manifest tersebut pada Root Layout (app/layout.jsx) via metadata Next.js. Pastikan aplikasi dapat dikenali dan di-install sebagai PWA di perangkat mobile maupun desktop.

**Hasil:**

**Perbaikan:**

## US-14 Deskripsi produk dibuat AI **[SENDIRI]**

**Prompt:**
Buat fitur penjelas/generator deskripsi produk berbasis AI pada form produk admin (app/admin/produk/tambah/page.jsx dan app/admin/produk/[id]/page.jsx). Tambahkan tombol "Generate Deskripsi dengan AI" di dekat kolom input deskripsi. Buat Route Handler / Server Action yang menerima nama produk serta kategori, lalu memanggil API AI/LLM (menggunakan API key dari environment variable AI_API_KEY) untuk membuatkan deskripsi penawaran yang menarik secara otomatis. Hasil deskripsi AI harus langsung mengisi (auto-fill) kolom input deskripsi pada form. Tampilkan indikator loading saat permintaan AI sedang diproses.

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
