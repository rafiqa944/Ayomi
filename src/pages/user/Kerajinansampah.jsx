import React from 'react';
import { Link } from 'react-router-dom';
import pot from '../../assets/foto/pot.png';
import back from '../../assets/foto/back.png';
import tastutupbotol from '../../assets/foto/tastutupbotol.png';
import kacamosaik from '../../assets/foto/kacamosaik.png';
import kursiban from '../../assets/foto/kursiban.png';
import tasperca from '../../assets/foto/tasperca.png';
import './Kerajinansampah.css';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';


const Kerajinansampah = () => {
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
            <h2>Olah sampahmu jadi kerajinan</h2>
        </div>  
        <div className='text-paragraf-container'>
            <div className='foto-kerajinansampah'>
            <img src={pot} alt='pot dari galon' className='foto-kerajinansampah' />
            </div>
            <div className='text-paragraf'>
            <h2>
              Pot tanaman dari galon bekas
            </h2>
            <p>
              Pot tanaman dari galon bekas merupakan cara kreatif untuk mendaur ulang 
              sampah plastik sekaligus memberikan tempat tumbuh yang ramah lingkungan 
              bagi tanaman. Dengan memotong, menghias, dan mengisi botol dengan tanah, 
              kita dapat menciptakan pot yang unik dan menarik, serta berkontribusi pada 
              pengurangan limbah plastik di lingkungan sekitar kita.
            </p>
            <Link to="/Tutorialkerajinansampah">
            <button className='action-button'>Lihat tutorial</button>
            </Link>
            </div>
        </div>
        <div className='text-paragraf-container'>
            <div className='foto-kerajinansampah'>
            <img src={tastutupbotol} alt='tas dari tutup botol' className='foto-kerajinansampah' />
            </div>
            <div className='text-paragraf'>
            <h2>
              Tas belanja dari tutup botol plastik
            </h2>
            <p>
              Tas belanja dari tutup botol plastik adalah inovasi
              ramah lingkungan yang mengubah sampah menjadi barang berguna.
              Dengan mengumpulkan tutup botol, menjahitnya menjadi satu kesatuan, 
              dan menambahkan pegangan, kita dapat menciptakan tas yang stylish dan kuat, 
              sambil mengurangi dampak negatif dari limbah plastik di lingkungan.
            </p>
            <Link to="/Tutorialkerajinansampah">
            <button className='action-button'>Lihat tutorial</button>
            </Link>
            </div>
        </div>
        <div className='text-paragraf-container'>
            <div className='foto-kerajinansampah'>
            <img src={kacamosaik} alt='limbah kaca' className='foto-kerajinansampah' />
            </div>
            <div className='text-paragraf'>
            <h2>
              Limbah kaca jadi kerajinan mosaik
            </h2>
            <p>
              Kain perca yang diolah menjadi tas adalah cara yang inovatif untuk 
              memanfaatkan sisa kain. Dengan menjahitnya, tercipta tas fungsional, stylish, 
              dan ramah lingkungan, sekaligus mengurangi limbah tekstil dan mengekspresikan 
              kreativitas desain.
            </p>
            <Link to="/Tutorialkerajinansampah">
            <button className='action-button'>Lihat tutorial</button>
            </Link>
            </div>
        </div>
        <div className='text-paragraf-container'>
            <div className='foto-kerajinansampah'>
            <img src={kursiban} alt='kursi dari ban' className='foto-kerajinansampah' />
            </div>
            <div className='text-paragraf'>
            <h2>
              Kursi dari ban bekas
            </h2>
            <p>
              Kursi dari ban bekas adalah solusi kreatif untuk mendaur ulang limbah 
              yang sering kali terabaikan. Dengan membersihkan dan menghias ban bekas, 
              kita dapat menciptakan kursi yang kokoh dan unik, yang tidak hanya berguna 
              sebagai tempat duduk, tetapi juga menambah sentuhan artistik pada ruang outdoor 
              atau indoor kita.
            </p>
            <Link to="/Tutorialkerajinansampah">
            <button className='action-button'>Lihat tutorial</button>
            </Link>
            </div>
        </div>
        <div className='text-paragraf-container'>
            <div className='foto-kerajinansampah'>
            <img src={tasperca} alt='tas dari kain perca' className='foto-kerajinansampah' />
            </div>
            <div className='text-paragraf'>
            <h2>
              Kain perca menjadi tas
            </h2>
            <p>
              Kain perca yang diolah menjadi tas adalah cara yang inovatif untuk 
              memanfaatkan sisa-sisa kain yang biasanya terbuang. Dengan menjahit 
              potongan-potongan kain menjadi satu kesatuan, kita dapat menciptakan 
              tas yang tidak hanya fungsional dan stylish, tetapi juga ramah lingkungan, 
              membantu mengurangi limbah tekstil sekaligus memberikan kesempatan untuk 
              berekspresi dalam desain dan warna.
            </p>
            <Link to="/Tutorialkerajinansampah">
            <button className='action-button'>Lihat tutorial</button>
            </Link>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default Kerajinansampah;