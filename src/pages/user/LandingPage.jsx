import React from 'react';
import './LandingPage.css';
import Navbar from '../../Components/Navbar';
import Content from '../../Components/Content';
import galeri1 from '../../assets/foto/galeri1.png';
import galeri2 from '../../assets/foto/galeri2.png';
import galeri3 from '../../assets/foto/galeri3.png';
import Footer from '../../Components/Footer';

const LandingPage = () => {
  return (
    <div className='landingpage'>
      <Navbar />
      <Content />

      <div className='gallery'>
      <div className='gallery-blur'></div> {/* Tambahkan elemen untuk blur */}
        <h1>Lihat yang sudah kami lakukan yuk!</h1>
        <div className="gallery-content">
          <img src={galeri1} alt='Galeri 1' className='gallery-item' />
          <img src={galeri2} alt='Galeri 2' className='gallery-item' />
          <img src={galeri3} alt='Galeri 3' className='gallery-item' />
        </div>
        <h3>Mari kita bersama-sama wujudkan perubahan nyata dan dukung misi Ayomi untuk menciptakan lingkungan yang lebih baik untuk kita semua.</h3>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
