import React from 'react';
import { Link } from 'react-router-dom';
import Bersihbersih from '../../assets/foto/Bersihbersih.png';
import sosialisasisampah from '../../assets/foto/sosialisasisampah.png';
import pemutaranfilm from '../../assets/foto/pemutaranfilm.png';
import ayom from '../../assets/foto/ayom.png';
import back from '../../assets/foto/back.png';
import './Events.css';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';


const Events = () => {
  return (
    <div>
      <Navbar />
      <div className="undo-container">
        <button className="undo-button" onClick={() => window.history.back()}>
        <img 
            src={back}
            alt="undo-icon" 
            className="undo-icon" 
        />
        </button>
        </div>
            <div className='ayoo'>
            <h2>Kegiatan komunitas</h2>
            <img src={ayom} alt='untuk h2' className='ayomtrash'/>
        </div>  
        <div className='text-paragraf-container'>
            <div className='foto-events'>
            <img src={Bersihbersih} alt='kegiatan bersih bersih' className='foto-events' />
            </div>
            <div className='text-paragraf'>
            <h2>
                Aksi Bersih-Bersih di Pantai Akkarena tanggal 10 Desember 2024
            </h2>
            <p>
              Aksi bersih-bersih di Pantai Akkarena pada 10 November 2024
              bertujuan untuk menjaga kebersihan dan kelestarian
              lingkungan pantai yang sering terancam oleh sampah. Kegiatan
              ini mengajak masyarakat untuk berpartisipasi dalam
              membersihkan pantai sambil meningkatkan kesadaran akan
              pentingnya menjaga ekosistem laut.
            </p>
            <Link to="/Formpendaftaran">
            <button className='action-button'>Daftar Sekarang</button>
            </Link>
            </div>
      </div>
        <div className='text-paragraf-container'>
            <div className='foto-events'>
            <img src={sosialisasisampah} alt='kegiatan sosialisasi' className='foto-events' />
            </div>
            <div className='text-paragraf'>
            <h2>
              Sosialisasi Pengelolaan Sampah di Sekolah: Ajarkan Anak Cinta Lingkungan!
            </h2>
            <p>
              Sosialisasi pengelolaan sampah di SDN Paccinang 1 tanggal 15
              November 2024 diadakan untuk mengajarkan anak-anak tentang
              pentingnya menjaga lingkungan melalui praktik pengelolaan
              sampah yang baik. Dengan melibatkan siswa dalam kegiatan
              seperti memilah sampah dan mendaur ulang, diharapkan mereka
              dapat mengembangkan kecintaan terhadap lingkungan dan
              menjadi agen perubahan di komunitas mereka.
            </p>
            <Link to="/Formpendaftaran">
            <button className='action-button'>Daftar Sekarang</button>
            </Link>
            </div>
        </div>

        <div className='text-paragraf-container'>
            <div className='foto-events'>
            <img src={pemutaranfilm} alt='kegiatan pemutaran film bersama' className='foto-events' />
            </div>
            <div className='text-paragraf'>
            <h2>
                Pemutaran Film dan Dialog Lingkungan: Bersama Wujudkan Aksi Kurangi Sampah!
            </h2>
            <p>
              Pemutaran film dan dialog lingkungan pada tanggal 23
              Desember 2024 di Benteng Rotterdam bertujuan untuk
              meningkatkan kesadaran masyarakat tentang isu sampah dan
              lingkungan. Melalui pemutaran film dokumenter tentang dampak
              sampah, acara ini mengajak peserta untuk berdiskusi dan
              merumuskan langkah-langkah konkret yang dapat diambil
              bersama untuk mengurangi sampah di komunitas. 
            </p>
            <Link to="/Formpendaftaran">
            <button className='action-button'>Daftar Sekarang</button>
            </Link>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default Events;
