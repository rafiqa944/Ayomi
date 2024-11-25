import React from 'react';
import './StyleAllJenis.css';
import image1 from '../../assets/foto/gelasplastik.png';
import image2 from '../../assets/foto/botolbirumuda.png';
import image3 from '../../assets/foto/botolwarna.png';
import image4 from '../../assets/foto/hdblow.png';
import image5 from '../../assets/foto/gelaswarna.png';
import image6 from '../../assets/foto/botolbening.png';
import image7 from '../../assets/foto/perabotplastik.png';
import image8 from '../../assets/foto/hd.png';
import image9 from '../../assets/foto/damar.png';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisPlastik = () => {
  return (
    <div>
    <Navbar/>
      <h1>Jenis - Jenis Plastik</h1>
      <div className="image-grid">
        <div className="image-container">
          <img src={image1} alt="Gambar 1" />
          <div className="overlay-text">Gelas Plastik</div>
        </div>
        <div className="image-container">
          <img src={image2} alt="Gambar 2" />
          <div className="overlay-text">Botol Biru Muda</div>
        </div>
        <div className="image-container">
          <img src={image3} alt="Gambar 3" />
          <div className="overlay-text">Botol warna</div>
        </div>
        <div className="image-container">
          <img src={image4} alt="Gambar 4" />
          <div className="overlay-text">HD Blow</div>
        </div>
        <div className="image-container">
          <img src={image5} alt="Gambar 5" />
          <div className="overlay-text">Gelas Warna</div>
        </div>
        <div className="image-container">
          <img src={image6} alt="Gambar 6" />
          <div className="overlay-text">Botol Bening</div>
        </div>
        <div className="image-container">
          <img src={image7} alt="Gambar 5" />
          <div className="overlay-text">Perabot Plastik</div>
        </div>
        <div className="image-container">
          <img src={image8} alt="Gambar 5" />
          <div className="overlay-text">HD</div>
        </div>
        <div className="image-container">
          <img src={image9} alt="Gambar 5" />
          <div className="overlay-text">Damar</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisPlastik;


