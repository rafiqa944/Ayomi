import React from 'react';
import Navbar from '../../Components/Navbar'; // Import Navbar component
import Footer from '../../Components/Footer'; // Import Footer component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Pengaturan.css';


const UserProfile = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="profile-page">
        <h1 className="page-title">Pengaturan</h1>
        <div className="profile-card">
          <div className="profile-avatar"></div>
            <h2 className="profile-name">Rafiqa Nurcahyani Ibrahim</h2>
            <p className="profile-points">0 Point</p>
        </div>


        <div className="profile-options">
          {/* Gunakan Link untuk tombol-tombol */}
          <Link to="/ubahprofile" className="profile-link">
            <button className="profile-button">
              Ubah Profile
              <span className="arrow">&gt;</span>
            </button>
          </Link>


          <Link to="/ayomipoint" className="profile-link">
            <button className="profile-button">
              Ayomi Points
              <span className="arrow">&gt;</span>
            </button>
          </Link>


          <Link to="/donasi" className="profile-link">
            <button className="profile-button">
              Donasimu
              <span className="arrow">&gt;</span>
            </button>
          </Link>


          <Link to="/signin" className="profile-link">
            <button className="profile-button">
              Sign Out
              <span className="arrow">&gt;</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer /> {/* Add Footer component */}
    </>
  );
};


export default UserProfile;
