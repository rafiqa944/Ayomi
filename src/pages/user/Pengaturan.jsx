import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import back from '../../assets/foto/back.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Pengaturan.css';

const Pengaturan = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/landingpage'); // Redirect to Landing Page if user is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="undo-container">
        <button className="undo-button" onClick={() => window.history.back()}>
          <img src={back} alt="undo-icon" className="undo-icon" />
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
          <Link to="/ubahprofile" className="profile-link">
            <button className="profile-button">Ubah Profile<span className="arrow">&gt;</span></button>
          </Link>
          <Link to="/ayomipoint" className="profile-link">
            <button className="profile-button">Ayomi Points<span className="arrow">&gt;</span></button>
          </Link>
          <Link to="/signin" className="profile-link">
            <button className="profile-button">Sign Out<span className="arrow">&gt;</span></button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pengaturan;
