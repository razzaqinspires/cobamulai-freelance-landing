import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PositionCard from './components/PositionCard';
import ApplyForm from './components/ApplyForm';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/App.css';

const positions = [
  {
    title: "Freelance Sales Website",
    description: "Komisi per project ± Rp700.000. Mencari klien & bantu komunikasi awal dengan klien."
  },
  {
    title: "Freelance Web Developer",
    description: "Fee ± Rp1.200.000–1.500.000 / project. Membuat website sesuai brief & timeline."
  },
  {
    title: "Freelance Admin / Akuntansi",
    description: "Per project / per bulan. Mencatat keuangan, laporan, dan rekap project."
  }
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <section className="positions">
          {positions.map((pos, idx) => (
            <PositionCard key={idx} title={pos.title} description={pos.description} />
          ))}
        </section>
        <ApplyForm />
      </main>
      <Footer />
      {/* Pastikan menggunakan format 62 di depan */}
      <WhatsAppButton phone="6288804074510" />
    </div>
  );
};

export default App;