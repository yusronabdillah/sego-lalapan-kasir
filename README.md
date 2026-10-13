# 🍗 Sego Sambel Mbak Cindy - Sistem Kasir (POS)

Sistem Kasir (Point of Sale) modern berbasis web yang ringan, responsif, dan dioptimalkan khusus untuk operasional cepat warung lalapan & penyetan **Sego Sambel Mbak Cindy**.

---

## ✨ Fitur Utama

- ⚡ **Cepat & Responsif**: Antarmuka ringan berbasis web vanilla tanpa loading berat.
- ⌨️ **Keyboard Optimized**: Transaksi super cepat dirancang ramah navigasi keyboard & kasir.
- 🍽️ **Manajemen Pesanan & Varian**:
  - Pilihan Level Pedas & Sambal (Sambal Pencet, Sambal Bawang, Sambal Ijo, dll).
  - Pilihan Dine In (Makan di Tempat) vs Bungkus (Takeaway).
  - Custom Add-ons & Top-up Menu.
- 💳 **Metode Pembayaran Fleksibel**:
  - Pembayaran Tunai (Cash) dengan kalkulator uang kembalian instan.
  - Pembayaran Non-Tunai / QRIS Dinamis terintegrasi.
- 📊 **Laporan & Analisis Penjualan**:
  - Rekap harian dan bulanan otomatis.
  - Analisis produk terlaris (Top 10 Menu) dan jam ramai (Peak Hours).
  - Ekspor laporan penjualan ke format CSV.
- 💸 **Pencatatan Keuangan & Arus Kas**:
  - Catat pengeluaran operasional (Belanja bahan, LPG, es batu, listrik, dll).
  - Input kas masuk / modal kasir.
- 📅 **Kalender Modern**: Pemilih tanggal & bulan menggunakan Flatpickr yang elegan dan intuitif.
- 💾 **Penyimpanan Lokal (Offline Ready)**: Menggunakan IndexedDB untuk menyimpan data produk dan transaksi dengan aman langsung di browser.

---

## 🚀 Menjalankan Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) terinstal di komputer.

### Langkah Menjalankan
1. Clone repositori ini:
   ```bash
   git clone https://github.com/yusronabdillah/sego-lalapan-kasir.git
   cd sego-lalapan-kasir
   ```

2. Jalankan server lokal:
   ```bash
   npm run dev
   ```

3. Buka browser dan akses:
   ```
   http://127.0.0.1:8081/index.html
   ```

---

## 📁 Struktur Direktori

```text
sego-lalapan-kasir/
├── kasir fix/
│   ├── index.html       # Aplikasi kasir utama (UI & Logika POS)
│   ├── logo.jpg         # Brand Logo Sego Sambel Mbak Cindy
│   └── bg-login.png     # Asset visual background
├── package.json         # Konfigurasi scripts runner
└── README.md            # Dokumentasi proyek
```

---

## 🌐 Deployment (Hosting)

Aplikasi ini dapat di-deploy dengan mudah ke layanan static hosting seperti **Netlify**, **Vercel**, atau **GitHub Pages**:
- **Publish Directory / Root**: Arahkan ke folder `kasir fix`.
- **Entry File**: `index.html`.

---

## 👨‍💻 Pengembang

Dikembangkan oleh **[@yusronabdillah](https://github.com/yusronabdillah)** untuk **Sego Sambel Mbak Cindy**.
