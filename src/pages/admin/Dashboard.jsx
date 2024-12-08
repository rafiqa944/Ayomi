import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Dashboard.css";

const DashboardAdmin = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTotalWeight = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Calculate the total weight of all donations
        const total = donationsData.reduce(
          (sum, donation) => sum + parseFloat(donation.weight || 0),
          0
        );
        setTotalWeight(total);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchTotalWeight();
  }, []);

  // Navigate to summary page when the box is clicked
  const handleBoxClick = () => {
    navigate("/ringkasansampah"); // Redirect to the Summary page
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h4 className="dashboard-title">Dashboard Admin</h4>
        <div className="paper-container">
          <div
            className="paper-box"
            onClick={handleBoxClick} // Add click event
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            <h6 className="paper-title">Total Sampah Yang Berhasil Dikumpulkan:</h6>
            <h4 className="paper-weight">{totalWeight} kg</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
