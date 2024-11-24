import React from 'react';
import './StyleAllJenis.css';
import image1 from '../../assets/foto/tv.png';
import image2 from '../../assets/foto/laptop.png';
import image3 from '../../assets/foto/mesincuci.png';
import image4 from '../../assets/foto/kulkas.png';
import image5 from '../../assets/foto/kipasangin.png';
import image6 from '../../assets/foto/handphone.png';
import image7 from '../../assets/foto/dispenser.png';
import image8 from '../../assets/foto/ac.png';
import image9 from '../../assets/foto/penanaknasi.png';
import image10 from '../../assets/foto/printer.png';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisBesiLogam = () => {
  return (
    <div>
    <Navbar/>
      <h1>Jenis - Jenis Elektronik</h1>
      <div className="image-grid">
        <div className="image-container">
          <img src={image1} alt="Gambar 1" />
          <div className="overlay-text">TV</div>
        </div>
        <div className="image-container">
          <img src={image2} alt="Gambar 2" />
          <div className="overlay-text">Laptop</div>
        </div>
        <div className="image-container">
          <img src={image3} alt="Gambar 3" />
          <div className="overlay-text">Mesin Cuci</div>
        </div>
        <div className="image-container">
          <img src={image4} alt="Gambar 4" />
          <div className="overlay-text">Kulkas</div>
        </div>
        <div className="image-container">
          <img src={image5} alt="Gambar 5" />
          <div className="overlay-text">Kipas Angin</div>
        </div>
        <div className="image-container">
          <img src={image6} alt="Gambar 6" />
          <div className="overlay-text">Handphone</div>
        </div>
        <div className="image-container">
          <img src={image7} alt="Gambar 5" />
          <div className="overlay-text">Dispenser</div>
        </div>
        <div className="image-container">
          <img src={image8} alt="Gambar 5" />
          <div className="overlay-text">AC</div>
        </div>
        <div className="image-container">
          <img src={image9} alt="Gambar 5" />
          <div className="overlay-text">Penanak Nasi</div>
        </div>
        <div className="image-container">
          <img src={image10} alt="Gambar 5" />
          <div className="overlay-text">Printer</div>
        </div>
      </div>
    <Footer/>
    </div>
  );
};


export default JenisBesiLogam;


