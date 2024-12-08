// export default Navbar;

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import LogoP from '../assets/foto/LogoP.png';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Authentication

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Cek status login menggunakan Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Menyimpan user jika login
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut();
  };

  return (
    <nav className="container">
      <Link to="/landingpage">
        <img src={LogoP} alt="Logo" className="LogoP" />
      </Link>
      <ul>

        <li className="dropdown">
          <button
            className="dropdown-btn"
            onClick={toggleDropdown}
          >
            Our Services
            <span className={`dropdown-icon ${dropdownVisible ? 'open' : ''}`}>v</span>
          </button>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><Link to="/FormDonasiSampah">Pick Up</Link></li>
              <li><Link to="/service2">Drop Off</Link></li>
              <li><Link to="/ayomipoint">Ayomi Points</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/events">Events</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>

        {!user ? (
          // Jika belum login, tampilkan link Sign In
          <li><Link to="/signin">Sign In</Link></li>
        ) : (
          // Jika sudah login, tampilkan link Profile
          <li><Link to="/pengaturan">Profile</Link></li>
        )}

        {/* <li>
          <Link to="FormDonasiSampah">
            <button className="btn">Donasi</button>
          </Link>
        </li> */}

        {user && (
          // Tombol untuk logout jika sudah login
          <li>
            <button className="btn" onClick={handleSignOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
