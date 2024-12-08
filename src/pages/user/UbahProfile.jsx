import React from 'react';
import Navbar from '../../Components/Navbar'; // Import Navbar component
import Footer from '../../Components/Footer'; // Import Footer component
import iconprofile from "../../assets/icon/iconprofile.png";
import iconayomipoints from "../../assets/icon/iconayomipoints.png";
import './Pengaturan.css';

const UserProfile = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="profile-page">
        <h1 className="page-title">Pengaturan</h1>
        <div className="info-section">
          <div className="user-info">
            <img src={iconprofile} alt="User Avatar" className="user-avatar" />
            <div className="points-text">
              <p><strong>Rafiqa Nurcahyani Ibrahim</strong></p>
            </div>
          </div>
          <div className="points-info">
            <img
              src={iconayomipoints}
              alt="Ayomi Point Icon"
              className="ayomi-icon"
            />
            <div className="points-text">
              <p><strong>Ayomi Point</strong></p>
              <p className="points-number">0</p>
            </div>
          </div>
        </div>


      </div>
      <Footer /> {/* Add Footer component */}
    </>
  );
};

export default UserProfile;


