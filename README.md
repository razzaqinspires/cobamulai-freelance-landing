# Cobamulai Freelance Landing Page

Website landing page sederhana dan responsif untuk keperluan rekrutmen tim freelance (Sales, Web Developer, dan Admin) di startup **Cobamulai**.

Project ini dibangun menggunakan **React**, **TypeScript**, dan **Vite** dengan fokus pada performa cepat dan kemudahan penggunaan.

## 🚀 Fitur Utama

* **Informasi Posisi:** Menampilkan detail lowongan (Sales, Developer, Admin).
* **Formulir Pelamar:** Input data pelamar (Nama, Email, Portfolio).
* **Integrasi WhatsApp:**
    * Data formulir otomatis terformat dan dikirim langsung ke WhatsApp HRD.
    * Tombol *floating chat* untuk konsultasi cepat.
* **Responsive Design:** Tampilan rapi di Mobile (HP) dan Desktop.

## 🛠️ Tech Stack

* [React](https://reactjs.org/) - Library UI
* [TypeScript](https://www.typescriptlang.org/) - Type safety
* [Vite](https://vitejs.dev/) - Build tool & Development server super cepat
* CSS3 - Styling custom (tanpa framework berat)

## 📂 Struktur Folder

```text
cobamulai-freelance-landing/
├── src/
│   ├── components/      # Komponen UI (Header, ApplyForm, dll)
│   ├── styles/          # File CSS global
│   ├── App.tsx          # Main layout
│   └── main.tsx         # Entry point
├── public/              # Aset statis (favicon, logo)
├── index.html           # File HTML utama
├── vite.config.ts       # Konfigurasi Vite
└── package.json         # Dependencies & Scripts

```

## 📦 Cara Menjalankan (Installation)

Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) di komputer Anda.

1. **Clone repository ini** (atau download zip):
```bash
git clone [https://github.com/username-anda/cobamulai-landing.git](https://github.com/username-anda/cobamulai-landing.git)
cd cobamulai-landing

```


2. **Install dependencies:**
```bash
npm install

```


3. **Jalankan server development:**
```bash
npm run start

```


Website akan berjalan di `http://localhost:5173` atau `http://127.0.0.1:5173`.

## 🚀 Build & Deploy

### Build untuk Production

Untuk membuat file statis yang siap di-upload ke hosting:

```bash
npm run build

```

Hasil build akan muncul di folder `dist/`.

### Deploy ke Vercel (Rekomendasi)

Project ini sudah dikonfigurasi agar mudah dideploy ke Vercel:

1. Push kode ke GitHub.
2. Buka [Vercel](https://vercel.com) -> **Add New Project**.
3. Import repository GitHub Anda.
4. Pastikan **Framework Preset** terpilih **Vite**.
5. Klik **Deploy**.

## 📝 Catatan Pengembang

* **Nomor WhatsApp:** Untuk mengubah nomor tujuan formulir, edit file `src/components/ApplyForm.tsx` dan `src/App.tsx`.
* **Masalah Network/Localhost:** Jika mengalami error saat menjalankan `npm run start` di terminal/VPS, pastikan konfigurasi `vite.config.ts` sudah di-set ke host `0.0.0.0`.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
