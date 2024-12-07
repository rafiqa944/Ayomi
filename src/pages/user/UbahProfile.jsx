import React from 'react';
import Navbar from '../../Components/Navbar'; // Import Navbar component
import Footer from '../../Components/Footer'; // Import Footer component
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


      </div>
      <Footer /> {/* Add Footer component */}
    </>
  );
};

export default UserProfile;


