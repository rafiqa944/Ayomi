import React, { useState } from 'react';
import './DonasiUser.css';

const DonasiPage = () => {
  // State untuk menyimpan status tab yang aktif
  const [activeTab, setActiveTab] = useState('Semua');

  // Data donasi yang berbeda statusnya
  const donations = [
    {
      id: 1,
      jenis: 'Sampah Aluminium',
      detail: 'Kaleng',
      berat: '1kg',
      status: 'Dalam Perjalanan',
      points: '50'
    },
    {
      id: 2,
      jenis: 'Sampah Kertas',
      detail: 'Buku Bekas',
      berat: '3kg',
      status: 'Dalam Perjalanan',
      points: '70'
    },
    {
      id: 3,
      jenis: 'Sampah Besi & Logam',
      detail: 'Tembaga Super',
      berat: '2kg',
      status: 'Selesai',
      points: '100'
    },
    {
      id: 4,
      jenis: 'Sampah Plastik',
      detail: 'Botol Plastik',
      berat: '1.5kg',
      status: 'Selesai',
      points: '40'
    },
    {
      id: 5,
      jenis: 'Sampah Organik',
      detail: 'Makanan Sisa',
      berat: '2kg',
      status: 'Dalam Perjalanan',
      points: '60'
    }
  ];

  // Fungsi untuk mengubah tab yang aktif
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filter donasi berdasarkan status yang dipilih
  const filteredDonations = donations.filter((item) => {
    if (activeTab === 'Semua') {
      return true; // Menampilkan semua donasi
    }
    return item.status === activeTab;
  });

  return (
    <div className="donasi-page">
      <h1>Donasi</h1>
      <div className="tab-menu">
        <button
          className={`tab ${activeTab === 'Semua' ? 'active' : ''}`}
          onClick={() => handleTabClick('Semua')}
        >
          Semua
        </button>
        <button
          className={`tab ${activeTab === 'Dalam Perjalanan' ? 'active' : ''}`}
          onClick={() => handleTabClick('Dalam Perjalanan')}
        >
          Dalam Perjalanan
        </button>
        <button
          className={`tab ${activeTab === 'Selesai' ? 'active' : ''}`}
          onClick={() => handleTabClick('Selesai')}
        >
          Selesai
        </button>
      </div>
      <div className="donasi-section">
        {filteredDonations.map((item) => (
          <div className="donation-item" key={item.id}>
            <div className="donation-icon">[Icon]</div>
            <div className="donation-details">
              <h3>{item.jenis}</h3>
              <p>Jenis Sampah: {item.detail}</p>
              <p>{item.berat}</p>
            </div>
            <div className="donation-status">
              <p>Status: {item.status}</p>
              {item.status === 'Dalam Perjalanan' && <p>Pesanan sedang dalam perjalanan menuju kota anda.</p>}
              {item.status === 'Selesai' && <p>Pesanan telah sampai dan diterima oleh anggota keluarga.</p>}
            </div>
            <div className="donation-points">
              <p>{item.points} points</p>
            </div>
            {item.status === 'Dalam Perjalanan' && (
              <div className="buttons">
                <button className="button-tracking">Tracking Driver</button>
                <button className="button-donate-again">Donasi Lagi</button>
              </div>
            )}
            {item.status === 'Selesai' && (
              <div className="buttons">
                <button className="button-claim">Klaim Point</button>
                <button className="button-donate-again">Donasi Lagi</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonasiPage;
