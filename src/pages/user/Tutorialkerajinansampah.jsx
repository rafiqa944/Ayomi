import React from "react";
import './Tutorialkerajinansampah.css'; 
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import pot from '../../assets/foto/pot.png';
import back from '../../assets/foto/back.png';

const Tutorialkerajinansampah = () => {
    return (
        <div>
        <Navbar />
        <div className="back-container">
          <button className="back-button" onClick={() => window.history.back()}>
          <img 
              src={back}
              alt="back-icon" 
              className="back-icon" 
          />
          </button>
        </div>
        <div className="text" >
        <h2>
            Pot tanaman dari galon
        </h2>
        <p>
            Pot tanaman dari galon bekas merupakan cara kreatif 
            untuk mendaur ulang sampah plastik sekaligus memberikan tempat 
            tumbuh yang ramah lingkungan bagi tanaman. Dengan memotong, menghias, 
            dan mengisi botol dengan tanah, kita dapat menciptakan pot yang unik 
            dan menarik, serta berkontribusi pada pengurangan limbah plastik di 
            lingkungan sekitar kita.
        </p>
        </div>
        <div className="foto-pot">
            <img src={ pot } alt="tutorial pot" className="foto-pot"/>
        </div>
        <div>
            <p className="Bahan">Bahan-bahan yang diperlukan:</p>
            <ol className="list-bahan">
                <li>Galon bekas Le Minerale yang sudah bersih dan dikeringkan.</li>
                <li>Gunting atau pisau tajam.</li>
                <li>Cat atau spidol permanen (opsional).</li>
                <li>Potongan kain atau anyaman sebagai penutup dasar (opsional).</li>
                <li>Tanaman yang ingin ditanam.</li>
            </ol>
        </div>
        <div>
            <p className="langkah">Langkah-langkahnya:</p>
            <ol className="urutan-langkah ">
                <li>Bersihkan galon bekas Le Minerale dengan air bersih 
                    dan pastikan sudah kering sepenuhnya. </li>
                <li>Jika Anda ingin memberikan sentuhan personal pada pot, 
                    Anda bisa mewarnai atau menghias galon dengan cat atau spidol permanen. 
                    Biarkan cat atau spidol permanen mengering dengan baik sebelum melanjutkan ke 
                    langkah berikutnya.</li>
                <li>Untuk mempermudah proses pemotongan, tandai garis-garis yang akan dipotong pada 
                    galon menggunakan spidol atau pensil.</li>
                <li>Gunakan gunting atau pisau tajam untuk memotong galon sesuai dengan garis yang sudah 
                    ditandai. Anda bisa memotong di bagian atas atau di bagian bawah galon, tergantung pada 
                    ukuran pot yang diinginkan. </li>
                <li>Jika Anda ingin menggunakan penutup dasar, ukur dan potong potongan kain atau anyaman dengan 
                    ukuran yang sesuai dengan bagian bawah galon. Tempatkan penutup dasar ini di bagian bawah galon.</li>
                <li>Setelah potongan galon siap, Anda dapat mengisi pot dengan tanah yang subur dan menanam tanaman 
                    yang diinginkan. </li>
                <li>Pastikan untuk menyiram tanaman secara teratur dan menjaga kelembaban tanah yang sesuai dengan kebutuhan 
                    tanaman yang anda tanam di dalam pot.</li>
            </ol>
            <div className="link">
            <h2>Link video turorial:</h2>
            <a href="https://www.youtube.com/watch?v=Z4Yl273lqXQ" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=Z4Yl273lqXQ</a>
            </div>
        </div>
    <Footer/>
    </div>
  )
};

export default Tutorialkerajinansampah;

