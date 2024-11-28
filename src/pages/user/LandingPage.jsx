import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Content from '../../Components/Content';
import galeri1 from '../../assets/foto/galeri1.png';
import galeri2 from '../../assets/foto/galeri2.png';
import galeri3 from '../../assets/foto/galeri3.png';
import pottanaman from '../../assets/foto/pottanaman.png';
import tas from '../../assets/foto/tas.png';
import limbah from '../../assets/foto/limbah.png';
import Footer from '../../Components/Footer';

const LandingPage = () => {
  return (
    <div className='landingpage'>
      <Navbar />
      <Content />

      <div className='gallery'>
        <h1>Lihat yang sudah kami lakukan yuk!</h1>
            <div className="gallery-content">
              <img src={galeri1} alt='Galeri 1' className='gallery-item' />
              <img src={galeri2} alt='Galeri 2' className='gallery-item' />
              <img src={galeri3} alt='Galeri 3' className='gallery-item' />
            </div>
        <h3>Jejak volunteer Ayomi dalam membawa kebaikan untuk komunitas dan lingkungan. <br />
          <span>Mari terus melangkah bersama menuju masa depan yang lebih baik!</span></h3>
            <div>
            <div className="gallery-text">
            <h2>  
              <span>Sampah</span> <br />
              <span>bisa jadi</span> <br />
              <span>Kerajinan?</span>
            </h2>
              <button className="sampah-btn">Lihat Selengkapnya</button>
            </div>
              <div className="gallery-item2-wrapper">
                  <img src={pottanaman} alt="foto pot" className="gallery-item2" />
                  <div className="gallery-item2-title">
                    Pot tanaman dari galon bekas
                  <a className="gallery-item2-link">Selengkapnya</a>
                  </div>
              </div>

              <div className="gallery-item2-wrapper">
                <img src={tas} alt="foto tas" className="gallery-item2" />
                <div className="gallery-item2-title">
                  Tas belanja dari tutup botol plastik
                <a className="gallery-item2-link">Selengkapnya</a>
                </div>
              </div>

              <div className="gallery-item2-wrapper">
                <img src={limbah} alt="foto limbah" className="gallery-item2" />
                <div className="gallery-item2-title">
                    Limbah kaca jadi kerajinan mosaik
                    <Link to="/JenisPlastik" className="gallery-item2-link"> {/* ini contoh */}
                        Selengkapnya
                    </Link>
                </div>
            </div>
            </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
