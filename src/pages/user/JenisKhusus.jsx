import React from 'react';
import './StyleAllJenis.css';
import image from '../../assets/foto/minyakjelantah.png';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisKhusus = () => {
  return (
    <div>
    <Navbar/>
      <h1>Jenis - Jenis Khusus</h1>
      <div className="image-grid">
        <div className="image-container">
          <img src={image} alt="Gambar 1" />
          <div className="overlay-text">Minyak Jelantah</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisKhusus;


