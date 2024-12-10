import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth to get the current user
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import "./RingkasanSampah.css"; // Import CSS file

const RingkasanSampah = () => {
  const [summaryData, setSummaryData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser; // Get the current authenticated user

    // Check if the user is logged in and if the user is an admin
    const checkAdminStatus = async () => {
      if (!currentUser) {
        navigate("/signin2"); // Redirect to login page if the user is not logged in
        return;
      }

      // Check the user's role in Firestore
      const userDoc = await getDocs(collection(db, "users"));
      const userRef = userDoc.docs.find(doc => doc.data().email === currentUser.email);

      if (!userRef || userRef.data().role !== "admin") {
        navigate("/signin2"); // Redirect to login page if the user is not an admin
      }
    };

    checkAdminStatus(); // Call function to check if the user is logged in and is an admin

    // Fetch and process donation data if the user is an admin
    const fetchSummaryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Group donations by wasteType and calculate total weight per type
        const groupedData = donationsData.reduce((acc, donation) => {
          const { wasteType, weight } = donation;
          if (wasteType) {
            if (!acc[wasteType]) {
              acc[wasteType] = 0;
            }
            acc[wasteType] += parseFloat(weight || 0);
          }
          return acc;
        }, {});

        // Convert grouped data into an array for easier rendering
        const formattedData = Object.entries(groupedData).map(([type, weight]) => ({
          type,
          weight,
        }));

        setSummaryData(formattedData);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, [navigate]);

  return (
    <div className="ringkasan-sampah-container">
      <Sidebar />
      <div className="ringkasan-sampah-content">
        <h2 className="ringkasan-sampah-title">
            Ringkasan Total Keseluruhan Sampah
        </h2>
        <table className="ringkasan-sampah-table">
          <thead>
            <tr>
              <th>Jenis Sampah</th>
              <th>Total Berat (kg)</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.weight} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RingkasanSampah;
