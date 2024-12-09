import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Import komponen untuk grafik batang
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import "./Dashboard.css";

const DashboardAdmin = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [donationData, setDonationData] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // State untuk menyimpan email pengguna
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalWeight = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set donations data
        setDonationData(donationsData);

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

    // Get the current logged-in user's email
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email); // Set email if user is logged in
    }

    fetchTotalWeight();
  }, []);

  // Group the donations by waste type and calculate the total weight per type
  const groupedData = donationData.reduce((acc, donation) => {
    const { wasteType, weight } = donation;
    if (wasteType) {
      if (!acc[wasteType]) {
        acc[wasteType] = 0;
      }
      acc[wasteType] += parseFloat(weight || 0);
    }
    return acc;
  }, {});

  // Convert grouped data into an array for the chart
  const chartData = Object.entries(groupedData).map(([type, weight]) => ({
    name: type,
    value: weight,
  }));

  // Navigate to summary page when the box is clicked
  const handleBoxClick = () => {
    navigate("/ringkasansampah"); // Redirect to the Summary page
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h4 className="dashboard-title">
          Welcome Back, {userEmail ? `${userEmail}!👋🏻` : "Admin"} {/* Menambahkan emotikon dan menghapus tanda kurung */}
        </h4>

        {/* Paper Box */}
        <div className="paper-container">
          <div
            className="paper-box"
            onClick={handleBoxClick}
            style={{ cursor: "pointer" }}
          >
            <h6 className="paper-title">Total Sampah Yang Berhasil Dikumpulkan:</h6>
            <h4 className="paper-weight">{totalWeight} kg</h4>
          </div>
        </div>

        {/* Grafik Sampah per Jenis */}
        <h4 style={{ marginTop: "40px" }}>Grafik Sampah per Jenis</h4>
        <ResponsiveContainer width="30%" height={250}> {/* Mengurangi lebar dan tinggi */}
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#B8C4B6" barSize={25} /> {/* Lebar batang lebih kecil */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAdmin;
