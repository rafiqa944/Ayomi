import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar'; // Import Navbar component
import Footer from '../../Components/Footer'; // Import Footer component
import back from '../../assets/foto/back.png';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { auth, db } from '../../config/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import './Pengaturan.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Ambil data user dari Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        navigate('/auth/sign-in'); // Arahkan ke halaman login jika user belum login
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div className="undo-container">
        <button className="undo-button" onClick={() => window.history.back()}>
        <img 
            src={back}
            alt="undo-icon" 
            className="undo-icon" 
        />
        </button>
        </div>
      <div className="profile-page">
        <h1 className="page-title">Pengaturan</h1>
        {userData ? (
          <div className="profile-card">
            <div className="profile-avatar"></div>
            <h2 className="profile-name">{userData.fullName}</h2>
            <p className="profile-points">{userData.points || '0 Point'}</p>
          </div>
        ) : (
          <p>No user data available</p>
        )}

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
