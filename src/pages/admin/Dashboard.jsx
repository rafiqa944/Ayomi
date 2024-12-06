// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../../Components/Sidebar"; // Impor Sidebar dari folder komponen
import './Dashboard.css'; // Mengimpor file CSS untuk Dashboard

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
