import React, { useState } from 'react';
import './SearchBar.css';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // untuk navigasi halaman

const SearchBar = () => {
  const [query, setQuery] = useState("");  // State untuk menyimpan input pencarian
  const [searchResults, setSearchResults] = useState([]); // State untuk menyimpan hasil pencarian
  const navigate = useNavigate(); // Hook untuk navigasi

  // Daftar acara yang dapat dicari (bisa diambil dari API atau database)
  const events = [
    { title: "Aksi Bersih-Bersih di Pantai Akkarena", date: "10 Desember 2024", link: "/events" },
    { title: "Sosialisasi Pengelolaan Sampah di Sekolah: Ajarkan Anak Cinta Lingkungan!", date: "", link: "/events" },
    { title: "Pemutaran Film dan Dialog Lingkungan: Bersama Wujudkan Aksi Kurangi Sampah!", date: "", link: "/events" },
    { title: "Ayomi mengkonversi sampahmu menjadi mata uang digital yang dapat kamu belanjakan...", date: "", link: "/ayomipoint" },
    { title: "Jenis sampah kertas", date: "", link: "/JenisKertas" },
    { title: "Jenis sampah plastik", date: "", link: "/JenisPlastik" },
    { title: "Jenis sampah aluminium", date: "", link: "/JenisAluminium" },
    { title: "Jenis sampah besi dan logam", date: "", link: "/JenisBesiLogam" },
    { title: "Jenis sampah elektronik", date: "", link: "/JenisElektronik" },
    { title: "Jenis sampah botol kaca", date: "", link: "/JenisBotolKaca" },
    { title: "Jenis sampah merk", date: "", link: "/JenisMerek" },
    { title: "Jenis sampah besi dan logam", date: "", link: "/JenisKhusus" },
    { title: "Donasi sampah", date: "", link: "/FormDonasiSampah" },
    // Tambahkan lebih banyak acara sesuai kebutuhan
  ];

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);

    // Menyaring acara yang cocok dengan query pencarian (tidak case-sensitive)
    const filteredResults = events.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  // Fungsi untuk menangani klik pada hasil pencarian
  const handleClick = (link) => {
    const isUserLoggedIn = localStorage.getItem('userToken'); // Misalnya token disimpan di localStorage

    // Cek apakah pengguna sudah login atau belum
    if (link === '/FormDonasiSampah' && !isUserLoggedIn) {
      console.log('Belum login, arahkan ke login');
      navigate('/FormDonasiSampah'); // Ganti '/login' dengan URL halaman login Anda
    } else {
      console.log('Navigasi ke /FormDonasiSampah');
      navigate(link);
    }
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        className="search-input" 
        placeholder="cari disini" 
        value={query} 
        onChange={handleSearch} // Menambahkan event handler untuk input
      />
      <button className="search-button">
        <IoIosSearch size={24} color="#000" /> 
      </button>

      {/* Menampilkan hasil pencarian */}
      {query && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((event, index) => (
            <div key={index} className="search-result-item" onClick={() => handleClick(event.link)}>
              <p>{event.title} {event.date && `- ${event.date}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
