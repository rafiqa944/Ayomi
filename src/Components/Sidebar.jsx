// // src/components/Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom"; // Jika menggunakan React Router untuk navigasi
// import './Sidebar.css'; // Mengimpor file CSS
// import LogoP from '../assets/foto/LogoP.png';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <Link to="/">
//         <img src={LogoP} alt="Logo" className='LogoP' />
//       </Link>
//       <ul className="menu">
//         <li className="menuItem"><Link to="/dashboard">Dashboard</Link></li>
//         <li className="menuItem"><Link to="/profile">Tutorial</Link></li>
//         <li className="menuItem"><Link to="/settings">Donate</Link></li>
//         <li className="menuItem"><Link to="/settings">User</Link></li>
//         <li className="menuItem"><Link to="/logout">Logout</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

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
      <Link to="/">
        <img src={LogoP} alt="Logo" className='LogoP' />
      </Link>
      <ul className="menu">
        <li className={`menuItem ${isActive("/dashboard")}`}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={`menuItem ${isActive("/tutorial")}`}>
          <Link to="/admintutorial">Tutorial</Link>
        </li>
        <li className={`menuItem ${isActive("/donate")}`}>
          <Link to="/donate">Donate</Link>
        </li>
        <li className={`menuItem ${isActive("/user")}`}>
          <Link to="/user">User</Link>
        </li>
        <li className={`menuItem ${isActive("/logout")}`}>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
