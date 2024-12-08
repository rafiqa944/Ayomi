import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../../Components/Sidebar";  // Import Sidebar
import "./Dashboard.css"; // Import CSS file

const DashboardAdmin = () => {
  const [totalWeight, setTotalWeight] = useState(0);

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
        setTotalWeight(total); // Update the total weight state
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchTotalWeight();
  }, []); // Fetch total weight once on component mount

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar */}
      <div className="dashboard-content">
        <h4 className="dashboard-title">
          Dashboard Admin
        </h4>
        {/* Add space between header and the paper box */}
        <div className="paper-container">
          <div className="paper-box">
            <h6 className="paper-title">
              Total Sampah Yang Berhasil Dikumpulkan:
            </h6>
            <h4 className="paper-weight">
              {totalWeight} kg
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
