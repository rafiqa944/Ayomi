// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Menggunakan useLocation dari React Router
import './Sidebar.css'; // Mengimpor file CSS
import LogoP from '../assets/foto/LogoP.png';

const Sidebar = () => {
  const location = useLocation(); // Mendapatkan lokasi saat ini

  // Fungsi untuk memeriksa apakah link aktif
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="sidebar">
      <img src={LogoP} alt="Logo" className='LogoP' />

      <ul className="menu">
        <li className={`menuItem ${isActive("/dashboard")}`}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={`menuItem ${isActive("/adminevents")}`}>
          <Link to="/adminevents">Admin Events</Link>
        </li>
        <li className={`menuItem ${isActive("/admintutorial")}`}>
          <Link to="/admintutorial">Tutorial</Link>
        </li>
        <li className={`menuItem ${isActive("/donate")}`}>
          <Link to="/donationlist">Donate</Link>
        </li>
        <li className={`menuItem ${isActive("/datauser")}`}>
          <Link to="/datauser">User</Link>
        </li>
        <li className={`menuItem ${isActive("/dataevent")}`}>
          <Link to="/registrationlist">Event</Link>
        </li>
        <li className={`menuItem ${isActive("/logout")}`}>
          <Link to="/signin2">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
