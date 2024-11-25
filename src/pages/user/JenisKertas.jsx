import React from 'react';
import './StyleAllJenis.css';
import image1 from '../../assets/foto/koran.png';
import image2 from '../../assets/foto/bukubekas.png';
import image3 from '../../assets/foto/kertasputihhvs.png';
import image4 from '../../assets/foto/kertaswarnaduplek.png';
import image5 from '../../assets/foto/kertasburam.png';
import image6 from '../../assets/foto/karton.png';
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
          <div className="overlay-text">Koran</div>
        </div>
        <div className="image-container">
          <img src={image2} alt="Gambar 2" />
          <div className="overlay-text">Buku Bekas</div>
        </div>
        <div className="image-container">
          <img src={image3} alt="Gambar 3" />
          <div className="overlay-text">Kertas Putih HVS</div>
        </div>
        <div className="image-container">
          <img src={image4} alt="Gambar 4" />
          <div className="overlay-text">Kertas Warna Duplex</div>
        </div>
        <div className="image-container">
          <img src={image5} alt="Gambar 5" />
          <div className="overlay-text">Kertas Buram</div>
        </div>
        <div className="image-container">
          <img src={image6} alt="Gambar 6" />
          <div className="overlay-text">Karton</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisKertas;


