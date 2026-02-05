import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'os'

// --- PERBAIKAN ERROR SYSTEM 13 ---
// Memaksa Node.js mengabaikan pengecekan network interface yang dilarang sistem
try {
  const original = os.networkInterfaces();
} catch (e) {
  os.networkInterfaces = () => ({});
}
// ---------------------------------

export default defineConfig({
  plugins: [react()],
  server: {
    // Gunakan 0.0.0.0 agar server mau menerima koneksi di lingkungan cloud/container
    host: '0.0.0.0', 
    port: 5173,
    strictPort: true, // Jangan ganti port jika 5173 terpakai
  }
})