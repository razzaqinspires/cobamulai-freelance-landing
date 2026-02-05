import React, { useState } from 'react';

// Format harus 62 di depan untuk wa.me
const WHATSAPP_NUMBER = '6288804074510'; 

const ApplyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    portfolio: ''
  });
  
  // State untuk notifikasi sukses
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, position, portfolio } = formData;
    
    // Validasi sederhana
    if(!name || !email || !phone || !position || !portfolio) return;

    const message = encodeURIComponent(
      `*Lamaran Freelance Cobamulai*\n\n` +
      `Nama: ${name}\n` +
      `Email: ${email}\n` +
      `No. HP: ${phone}\n` +
      `Posisi: ${position}\n` +
      `Portfolio/CV: ${portfolio}\n\n` +
      `Mohon info selanjutnya.`
    );

    // Buka WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    
    // Tampilkan pesan sukses dan reset form
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', position: '', portfolio: '' });
    
    // Hilangkan pesan sukses setelah 5 detik
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="apply-form">
      <h2>Daftar Sekarang</h2>
      
      {/* Menampilkan notifikasi jika sukses */}
      {isSubmitted && (
        <div className="form-success">
          Mengarahkan ke WhatsApp... Terima kasih telah mendaftar!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nama Lengkap</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Contoh: Budi Santoso" />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="nama@email.com" />

        <label>No. WhatsApp</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{9,15}" placeholder="08xxxxxxxxxx" />

        <label>Posisi yang Dilamar</label>
        <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="">--Pilih Posisi--</option>
          <option value="Sales">Freelance Sales Website</option>
          <option value="Developer">Freelance Web Developer</option>
          <option value="Admin">Freelance Admin / Akuntansi</option>
        </select>

        <label>Link Portfolio / CV (Google Drive/LinkedIn)</label>
        <textarea name="portfolio" rows={4} value={formData.portfolio} onChange={handleChange} placeholder="Paste link portfolio atau CV Anda di sini..." required></textarea>

        <button type="submit">Kirim Lamaran via WhatsApp</button>
      </form>
    </div>
  );
};

export default ApplyForm;