import React from 'react';
import './StyleAllJenis.css';
import image1 from '../../assets/foto/almatipis.png';
import image2 from '../../assets/foto/almatebal.png';
import image3 from '../../assets/foto/les.png';
import image4 from '../../assets/foto/kaleng.png';
import image5 from '../../assets/foto/seng.png';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisKertas = () => {
  return (
    <div>
    <Navbar/>
      <h1>Jenis - Jenis Kertas</h1>
      <div className="image-grid">
        <div className="image-container">
          <img src={image1} alt="Gambar 1" />
          <div className="overlay-text">Alma Tipis</div>
        </div>
        <div className="image-container">
          <img src={image2} alt="Gambar 2" />
          <div className="overlay-text">Alma Tebal</div>
        </div>
        <div className="image-container">
          <img src={image3} alt="Gambar 3" />
          <div className="overlay-text">Les</div>
        </div>
        <div className="image-container">
          <img src={image4} alt="Gambar 4" />
          <div className="overlay-text">Kaleng</div>
        </div>
        <div className="image-container">
          <img src={image5} alt="Gambar 5" />
          <div className="overlay-text">Seng</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisKertas;


