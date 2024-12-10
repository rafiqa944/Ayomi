import React, { useState, useEffect } from 'react';
import './Navbar.css';
import LogoP from '../assets/foto/LogoP.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when authentication state changes
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut()
      .then(() => {
        navigate('/landingpage'); // Redirect to Landing Page after sign out
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  };

  const isActive = (path) => location.pathname.startsWith(path) ? 'active' : '';

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
              <li><Link to="/FormDonasiSampah" className={isActive('/FormDonasiSampah')}>Pick Up</Link></li>
              <li><Link to="/service2" className={isActive('/service2')}>Drop Off</Link></li>
              <li><Link to="/ayomipoint" className={isActive('/ayomipoint')}>Ayomi Points</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/events" className={isActive('/events')}>Events</Link></li>
        <li><Link to="/aboutus" className={isActive('/aboutus')}>About Us</Link></li>
        {!user ? (
          <>
            <li>
              <button className="btn">
                <Link to="/signin" className={isActive('/signin')}>Sign In</Link>
              </button>
            </li>
            <li>
              <button className="btn">
                <Link to="/signin2" className={isActive('/signin2')}>Sign In Admin</Link>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/pengaturan" className={isActive('/pengaturan')}>Profile</Link>
            </li>
            <li>
              <button className="btn" onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
