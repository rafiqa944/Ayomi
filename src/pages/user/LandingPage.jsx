import React from 'react';
import './LandingPage.css';
import Navbar from '../../Components/Navbar';
import Content from '../../Components/Content';
import galeri1 from '../../assets/foto/galeri1.png';
import galeri2 from '../../assets/foto/galeri2.png';
import galeri3 from '../../assets/foto/galeri3.png';
import pottanaman from '../../assets/foto/pottanaman.png';
import tas from '../../assets/foto/tas.png';
import limbah from '../../assets/foto/limbah.png';
import Footer from '../../Components/Footer';
import LogoH from '../../assets/foto/LogoH.png';
import Bersihbersih from '../../assets/foto/Bersihbersih.png';
import sosialisasisampah from '../../assets/foto/sosialisasisampah.png';
import iconpickup from '../../assets/icon/iconpickup.png';
import icondropoff from '../../assets/icon/icondropoff.png';
import iconayomipoints from '../../assets/icon/iconayomipoints.png';
import iconkertas from '../../assets/icon/iconkertas.png';
import iconplastik from '../../assets/icon/iconplastik.png';
import iconbesilogam from '../../assets/icon/iconbesilogam.png';
import iconelektronik from '../../assets/icon/iconelektronik.png';
import iconbotolkaca from '../../assets/icon/iconbotolkaca.png';
import iconmerek from '../../assets/icon/iconmerek.png';
import iconkhusus from '../../assets/icon/iconkhusus.png';
import iconaluminium from '../../assets/icon/iconaluminium.png';
import donasi from '../../assets/foto/donasi.png';

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landingpage">
      <Navbar />
      <Content />

      <div className="gallery">
        <h1>Lihat yang sudah kami lakukan yuk!</h1>
        <div className="gallery-content">
          <img src={galeri1} alt="Galeri 1" className="gallery-item" />
          <img src={galeri2} alt="Galeri 2" className="gallery-item" />
          <img src={galeri3} alt="Galeri 3" className="gallery-item" />
        </div>
        <h3>
          Jejak volunteer Ayomi dalam membawa kebaikan untuk komunitas dan lingkungan. <br />
          <span>Mari terus melangkah bersama menuju masa depan yang lebih baik!</span>
        </h3>

        <div>
          <div className="gallery-text">
            <h2>
              <span>Sampah</span> <br />
              <span>bisa jadi</span> <br />
              <span>Kerajinan?</span>
            </h2>
            <Link to="Kerajinansampah">
              <button className="sampah-btn">Lihat Selengkapnya</button>
            </Link>
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
              <Link to="/JenisPlastik" className="gallery-item2-link">
                Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="ayomi-open">
          <h2>
            <span>Kegiatan </span> <br />
            <img src={LogoH} alt="Logo Ayomi" className="logo-ayomi" /> <br />
            <span> sedang</span> <br />
            <span> terbuka,</span> <br />
            <span> daftar yuk!</span> <br />
          </h2>
          <Link to="Events">
            <button className="ayomi-btn">Lihat Selengkapnya</button>
          </Link>
        </div>

        <div className="text-ayomi-container">
          <div className="foto-ayomi-events">
            <img src={Bersihbersih} alt="kegiatan bersih bersih" className="foto-ayomi-events" />
          </div>
          <div className="text-ayomi-paragraf">
            <h2>Aksi Bersih-Bersih di Pantai Akkarena tanggal 10 Desember 2024</h2>
            <p>
              Aksi bersih-bersih di Pantai Akkarena pada 10 Desember 2024
              bertujuan untuk menjaga kebersihan dan kelestarian
              lingkungan pantai yang sering terancam oleh sampah. Kegiatan
              ini mengajak masyarakat untuk berpartisipasi dalam
              membersihkan pantai sambil meningkatkan kesadaran akan
              pentingnya menjaga ekosistem laut.
            </p>
            <Link to="Events">
              <button className="daftar-button">Daftar Sekarang</button>
            </Link>
          </div>
        </div>

        <div className="ayomi-sosialisasi">
          <img
            src={sosialisasisampah}
            alt="sosialisasi pengelolaan sampah"
            className="sosialisasi-sampah"
          />
          <div className="text-sosialisasi">
            <h2>Sosialisasi Pengelolaan Sampah di Sekolah: Ajarkan Anak Cinta Lingkungan!</h2>
            <p>
              Sosialisasi pengelolaan sampah di SDN Paccinang 1 tanggal 15
              November 2024 diadakan untuk mengajarkan anak-anak tentang
              pentingnya menjaga lingkungan melalui praktik pengelolaan
              sampah yang baik. Dengan melibatkan siswa dalam kegiatan
              seperti memilah sampah dan mendaur ulang, diharapkan mereka
              dapat mengembangkan kecintaan terhadap lingkungan dan
              menjadi agen perubahan di komunitas mereka.
            </p>
            <Link to="Events">
              <button className="sosialisasi-button">Daftar Sekarang</button>
            </Link>
          </div>
        </div>
      </div>

      <div>
      <h1 className="teks-layanankami">Layanan Kami</h1>
        <div className="layanan-container">
            <div className="layanan-card">
              <img src={iconpickup} alt="Icon Pick Up" className="layanan-icon" />
              <h3>Pick Up</h3>
              <p>
                Kumpulkan sampah daur ulangmu, kemudian isi form donasi,
                Kolektor Ayomi terdekat akan menjemput, menimbang, dan membayar sampahmu.
              </p>
            </div>
          <div className="layanan-card">
            <img src={icondropoff} alt="Icon Drop Off" className="layanan-icon" />
            <h3>Drop Off</h3>
            <p>
              Antar langsung sampah daur ulangmu ke Recycling Centre terdekat,
              kamu bisa mendaur ulang dengan ukuran kecil seperti satu botol plastik.
            </p>
          </div>
          <div className="layanan-card">
            <img src={iconayomipoints} alt="Icon Ayomi Points" className="layanan-icon" />
            <h3>Ayomi Points</h3>
            <p>
              Ayomi mengkonversi sampahmu menjadi mata uang digital yang dapat kamu belanjakan,
              atau tukarkan dengan beragam produk menarik.
            </p>
          </div>
        </div>

      <div className="jenis-sampah-section">
        <h1>Jenis Sampah</h1>
        <p>Lihat semua jenis sampah yang kami daur ulang</p>
        <div className="jenis-sampah-container">
          <div className="jenis-sampah-card">
            <Link to ="JenisKertas">
              <img src={iconkertas} alt="Kertas" />
              <h3>Kertas</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to ="JenisPlastik">
            <img src={iconplastik} alt="Plastik" />
            <h3>Plastik</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to ="JenisAluminium">
            <img src={iconaluminium} alt="Aluminium" />
            <h3>Aluminium</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to = "JenisBesiLogam">
            <img src={iconbesilogam} alt="Besi & Logam" />
            <h3>Besi & Logam</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to ="JenisElektronik">
            <img src={iconelektronik} alt="Elektronik" />
            <h3>Elektronik</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to = "JenisBotolKaca">
            <img src={iconbotolkaca} alt="Botol Kaca" />
            <h3>Botol Kaca</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to ="JenisMerek">
            <img src={iconmerek} alt="Merek" />
            <h3>Merek</h3>
            </Link>
          </div>
          <div className="jenis-sampah-card">
            <Link to = "JenisKhusus">
            <img src={iconkhusus} alt="Khusus" />
            <h3>Khusus</h3>
            </Link>
          </div>
        </div>
      </div>

      <div className="donation-section">
        <img src={donasi} alt="Donasi Sampah" className="donation-image" />
        <div className="donation-text">
          <h2>Donasikan Sampahmu sekarang juga!</h2>
          <p>
            Ubah sampahmu menjadi manfaat dengan mendonasikannya sekarang! <br/> Setiap donasi sampah yang Anda berikan akan 
            membantu mendukung <br/> program daur ulang dan menjaga kelestarian lingkungan.
          </p>
          <Link to="FormDonasiSampah">
          <button className="donation-button">Daftar donasi</button>
          </Link>
        </div>
      </div>

      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
