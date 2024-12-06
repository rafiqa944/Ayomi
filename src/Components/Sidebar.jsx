// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Jika menggunakan React Router untuk navigasi
import './Sidebar.css'; // Mengimpor file CSS
import LogoP from '../assets/foto/LogoP.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <img src="../../assets/foto/ayom.png" alt="Logo" className="sidebar-logo" /> */}
      <Link to="/">
        <img src={LogoP} alt="Logo" className='LogoP' />
      </Link>
      <ul className="menu">
        <li className="menuItem"><Link to="/dashboard">Dashboard</Link></li>
        <li className="menuItem"><Link to="/profile">Tutorial</Link></li>
        <li className="menuItem"><Link to="/settings">Donate</Link></li>
        <li className="menuItem"><Link to="/settings">User</Link></li>
        <li className="menuItem"><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;