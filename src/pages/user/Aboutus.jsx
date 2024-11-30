import React from "react";
import goals from "../../assets/foto/goals.png";
import penanganan from "../../assets/foto/penanganan.png";
import energi from "../../assets/foto/energi.png";
import ayom from "../../assets/foto/ayom.png";
import LPfoto from "../../assets/foto/LPfoto.png"; // Pastikan path benar
import Navbar from "../../Components/Navbar"; // Pastikan path benar
import Footer from "../../Components/Footer";
import "./Aboutus.css";

const Aboutus = () => {
  return (
    <div className="aboutus">
      <Navbar />
      <div className="activity-image">
        <img src={LPfoto} alt="Gambar Kegiatan Komunitas" className="activity-image" />
        <div className="text-overlay">
        <h1>About Us</h1>
        </div>
      </div>
        <div className='ayooo'>
            <h2>SDG’s dan</h2>
            <img src={ayom} alt='untuk h2' className='ayomtrash'/>
        </div>
        <div className="foto-logooo">
            <img src={goals} alt="logo sdgs" className="foto-logooo"/> 
        </div>
        <div className="foto-hijau">
            <img src={penanganan} alt="perubahan iklim" className="foto-hijau"/> 
            <img src={energi} alt="energi bersih" className="foto-hijau"/>
        </div>
        <div className="text">
            <p>Ayomi.com adalah inisiatif digital yang muncul dari kesadaran mendalam akan 
                pentingnya menjaga kelestarian lingkungan. Di tengah meningkatnya jumlah sampah 
                yang dihasilkan setiap hari, terutama di kota-kota besar, Ayomi hadir sebagai 
                solusi untuk mengajak masyarakat berperan aktif dalam mengatasi tantangan ini. 
                Berfokus pada kolaborasi, edukasi, dan aksi nyata, Ayomi.com menghubungkan orang-orang 
                yang peduli terhadap lingkungan dengan berbagai aktivitas positif yang dapat mereka lakukan.
            </p>
        </div>
        <div className="text-container">
            <div className="text-lagi">
                <h2>Visi</h2>
                <p>
                    Mewujudkan masyarakat yang peduli lingkungan dengan mendukung pengelolaan 
                    sampah berkelanjutan untuk menciptakan masa depan yang bersih dan bernilai ekonomis.
                </p>
            </div>
            <div className="text-lagi-dua">
                <h2>Misi</h2>
                <p>
                    Mengedukasi masyarakat tentang pentingnya pengelolaan sampah yang bertanggung jawab, 
                    memfasilitasi partisipasi dalam kegiatan volunteer terkait daur ulang dan pengelolaan 
                    sampah, serta mendukung inovasi dalam pemanfaatan sampah menjadi produk bernilai ekonomis. 
                </p>
            </div>
        </div>
      <Footer/>
    </div>
  );
};

export default Aboutus;

