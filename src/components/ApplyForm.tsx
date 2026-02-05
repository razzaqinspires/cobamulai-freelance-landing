import React, { useState } from 'react';

const WHATSAPP_NUMBER = '6288804074510'; 

const ApplyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    portfolio: '' // Bisa link atau keterangan
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      // 1. Simpan data ke GitHub via API Vercel
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Gagal menyimpan data');

      const myReferralCode = data.referralCode;

      // 2. Siapkan Pesan WhatsApp
      const message = encodeURIComponent(
        `*Lamaran Freelance Cobamulai*\n` +
        `Kode Ref: *${myReferralCode}* (Auto-Generated)\n\n` +
        `Nama: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Posisi: ${formData.position}\n` +
        `Portfolio Link: ${formData.portfolio}\n\n` +
        `📎 *SAYA AKAN MENGIRIMKAN LAMPIRAN FILE/CV SETELAH PESAN INI.*`
      );

      // 3. Arahkan ke WhatsApp
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', position: '', portfolio: '' });
      setFile(null);

    } catch (error) {
      console.error(error);
      setStatus('error');
      // Fallback: Jika API error, tetap buka WA tapi tanpa kode referral database
      const fallbackMsg = encodeURIComponent(`Halo, saya ${formData.name} ingin melamar posisi ${formData.position}. (System Error: Gagal generate reff code)`);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${fallbackMsg}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-form">
      <h2>Daftar & Dapatkan Kode Referral</h2>
      
      {status === 'success' && (
        <div className="form-success">
          ✅ Data tersimpan di sistem! Silakan lanjutkan kirim pesan & gambar di WhatsApp.
        </div>
      )}
      
      {status === 'error' && (
        <div className="form-error">
          ⚠️ Gagal menyimpan ke database, tapi tetap mengarahkan ke WhatsApp...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nama Lengkap</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Contoh: Budi Santoso" />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>No. WhatsApp</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{9,15}" />

        <label>Posisi</label>
        <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="">--Pilih Posisi--</option>
          <option value="Sales">Sales</option>
          <option value="Developer">Web Developer</option>
          <option value="Admin">Admin</option>
        </select>

        <label>Link Portfolio / LinkedIn</label>
        <textarea name="portfolio" rows={2} value={formData.portfolio} onChange={handleChange} required placeholder="Link Google Drive / LinkedIn..."></textarea>

        <label>Upload File Pendukung (CV/Foto)</label>
        <p style={{fontSize: '0.8em', color: '#666', marginBottom: '5px'}}>
          *File ini harus Anda kirim manual di chat WhatsApp nanti.
        </p>
        <input type="file" onChange={handleFileChange} accept="image/*,.pdf" />

        <button type="submit" disabled={loading}>
          {loading ? 'Sedang Memproses...' : 'Dapatkan Referral & Chat WhatsApp'}
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;