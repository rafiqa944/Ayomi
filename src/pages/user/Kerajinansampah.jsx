import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebaseConfig'; // Impor konfigurasi Firebase
import './Kerajinansampah.css';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import back from '../../assets/foto/back.png';

const Kerajinansampah = () => {
  const [kerajinanList, setKerajinanList] = useState([]); // State untuk daftar kerajinan
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    const fetchKerajinan = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "kerajinan"));
        const kerajinanData = [];
        querySnapshot.forEach((doc) => {
          kerajinanData.push(doc.data());
        });
        setKerajinanList(kerajinanData);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKerajinan();
  }, []);

  // Jika loading data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Jika terjadi error
  if (error) {
    return <p>{error}</p>;
  }

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

      {/* Menampilkan daftar kerajinan */}
      {kerajinanList.map((kerajinan, index) => (
        <div className='text-paragraf-container' key={index}>
          <div className='foto-kerajinansampah'>
            <img src={kerajinan.gambar} alt={kerajinan.nama} className='foto-kerajinansampah' />
          </div>
          <div className='text-paragraf'>
            <h2>{kerajinan.nama}</h2>
            <p>{kerajinan.deskripsi}</p>
            <Link to="/Tutorialkerajinansampah">
              <button className='action-button'>Lihat tutorial</button>
            </Link>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Kerajinansampah;
