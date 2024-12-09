import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ayom from '../../assets/foto/ayom.png';
import back from '../../assets/foto/back.png';
import { db } from "../../config/firebaseConfig"; // Pastikan ini sesuai dengan path yang benar
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import './Events.css';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';


const Events = () => {
  const [events, setEvents] = useState([]);  // State untuk menyimpan daftar kegiatan

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      setEvents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="undo-container">
        <button className="undo-button" onClick={() => window.history.back()}>
          <img src={back} alt="undo-icon" className="undo-icon" />
        </button>
      </div>

      <div className="ayoo">
        <h2>Kegiatan Komunitas</h2>
        <img src={ayom} alt="untuk h2" className="ayomtrash" />
      </div>

      {/* Looping over events and displaying them */}
      {events.map(event => (
        <div className="text-paragraf-container" key={event.id}>
          <div className="foto-events">
            {/* Check if image exists, otherwise display a placeholder */}
            <img src={event.gambar || '/assets/foto/placeholder.png'} alt={event.nama_lengkap} className="foto-events" />
          </div>
          <div className="text-paragraf">
            <h2>{event.nama_lengkap}</h2>
            <p>{event.deskripsi}</p>
            <p>Lokasi: {event.lokasi}</p>
            <p>Mulai: {new Date(event.waktu_mulai.seconds * 1000).toLocaleString()}</p>
            <p>Selesai: {new Date(event.waktu_selesai.seconds * 1000).toLocaleString()}</p>
            <Link to={`/FormPendaftaranKegiatan/${event.id}`}>
              <button className="action-button">Daftar Sekarang</button>
            </Link>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Events;
