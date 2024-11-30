import React, { useState } from 'react';
import './Navbar.css';
import LogoP from '../assets/foto/LogoP.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className='container'>
      <Link to="/">
        <img src={LogoP} alt="Logo" className='LogoP' />
      </Link>
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li className="dropdown">
          <button
            className="dropdown-btn"
            onClick={toggleDropdown}
          >
            Our Services
            <span className={`dropdown-icon ${dropdownVisible ? 'open' : ''}`}>▼</span>
          </button>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li><Link to="/service1">Pick Up</Link></li>
              <li><Link to="/service2">Drop Off</Link></li>
              <li><Link to="/service3">Ayomi Points</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li>
          <button className='btn'>Donasi</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
