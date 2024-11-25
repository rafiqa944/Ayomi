import React from 'react';
import './StyleAllJenis.css';
import image1 from '../../assets/foto/botolkecap.png';
import image2 from '../../assets/foto/botolsaos.png';
import image3 from '../../assets/foto/botolsirupdht.png';
import image4 from '../../assets/foto/botolminumankerasbesar.png';
import image5 from '../../assets/foto/botolminumankeraskecil.png';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisBotolKaca = () => {
  return (
    <div>
    <Navbar/>
      <h1>Jenis - Jenis Botol Kaca</h1>
      <div className="image-grid">
        <div className="image-container">
          <img src={image1} alt="Gambar 1" />
          <div className="overlay-text">Botol Kecap</div>
        </div>
        <div className="image-container">
          <img src={image2} alt="Gambar 2" />
          <div className="overlay-text">Botol Saos</div>
        </div>
        <div className="image-container">
          <img src={image3} alt="Gambar 3" />
          <div className="overlay-text">Botol Sirup DHT</div>
        </div>
        <div className="image-container">
          <img src={image4} alt="Gambar 4" />
          <div className="overlay-text">Botol Minuman Besar Keras</div>
        </div>
        <div className="image-container">
          <img src={image5} alt="Gambar 5" />
          <div className="overlay-text">Botol Minuman Besar Keras</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisBotolKaca;


