import React from 'react';
import './StyleAllJenis.css';
import image1 from '../../assets/foto/besitebal.png';
import image2 from '../../assets/foto/kuningan.png';
import image3 from '../../assets/foto/tembagasuper.png';
import image4 from '../../assets/foto/tembagatipis.png';
import image5 from '../../assets/foto/tembagabiasa.png';
import image6 from '../../assets/foto/timah.png';
import image7 from '../../assets/foto/kepalaaki.png';
import image8 from '../../assets/foto/aki.png';
import image9 from '../../assets/foto/besipremium.png';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisBesiLogam = () => {
  return (
    <div>
    <Navbar/>
      <h1>Jenis - Jenis Besi & Logam</h1>
      <div className="image-grid">
        <div className="image-container">
          <img src={image1} alt="Gambar 1" />
          <div className="overlay-text">Besi Tebal</div>
        </div>
        <div className="image-container">
          <img src={image2} alt="Gambar 2" />
          <div className="overlay-text">Kuningan</div>
        </div>
        <div className="image-container">
          <img src={image3} alt="Gambar 3" />
          <div className="overlay-text">Tembaga Super</div>
        </div>
        <div className="image-container">
          <img src={image4} alt="Gambar 4" />
          <div className="overlay-text">Tembaga Tipis</div>
        </div>
        <div className="image-container">
          <img src={image5} alt="Gambar 5" />
          <div className="overlay-text">Tembaga Biasa</div>
        </div>
        <div className="image-container">
          <img src={image6} alt="Gambar 6" />
          <div className="overlay-text">Timah</div>
        </div>
        <div className="image-container">
          <img src={image7} alt="Gambar 5" />
          <div className="overlay-text">Kepala Aki</div>
        </div>
        <div className="image-container">
          <img src={image8} alt="Gambar 5" />
          <div className="overlay-text">Aki</div>
        </div>
        <div className="image-container">
          <img src={image9} alt="Gambar 5" />
          <div className="overlay-text">Besi Premium</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisBesiLogam;


