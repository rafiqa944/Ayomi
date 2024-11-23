import React from 'react';
import './Content.css';
import LogoP from '../assets/foto/LogoP.png';
import SearchBar from './SearchBar'; // Import SearchBar di sini

const Content = () => {
  return (
    <div className='content'>
      <div className="content-text">
        <img src={LogoP} alt="" className='Logo' />
        <h3>
          Bersama membangun komunitas peduli lingkungan melalui edukasi, kegiatan 
          volunteer, dan donasi sampah. Gabung untuk masa depan yang lebih bersih!
        </h3>
        <SearchBar /> {/* Tambahkan SearchBar di sini */}
      </div>
    </div>
  );
};

export default Content;
