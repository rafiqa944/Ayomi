import React from 'react';
import './Navbar.css';
import LogoP from '../assets/foto/LogoP.png';
import { Link } from 'react-router-dom'; // Import Link dari React Router

const Navbar = () => {
  return (
    <nav className='container'>
      {/* Gunakan <Link> untuk membuat logo menjadi tautan */}
      <Link to="/">
        <img src={LogoP} alt="Logo" className='LogoP' />
      </Link>
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/services">Our Services</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li>
          <button className='btn'>Donasi</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
