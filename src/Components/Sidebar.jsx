import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import './Sidebar.css'; // Mengimpor file CSS
import LogoP from '../assets/foto/LogoP.png';

const Sidebar = () => {
  const location = useLocation(); // Mendapatkan lokasi saat ini
  const navigate = useNavigate(); // Untuk navigasi

  // Fungsi untuk memeriksa apakah link aktif
  const isActive = (path) => location.pathname === path ? "active" : "";

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/signin2"); // Navigasi ke halaman Sign In jika konfirmasi logout
    }
  };

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
        <li className={`menuItem`}>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
