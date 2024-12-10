import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAuth } from "firebase/auth";
import "./Dashboard.css";

const Dashboard = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [donationData, setDonationData] = useState([]);
  const [tutorialCount, setTutorialCount] = useState(0); // State untuk menyimpan jumlah tutorial (sampah yang didaur ulang)
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Jika user tidak login atau bukan admin, arahkan ke halaman login
    const checkAdminStatus = async () => {
      if (!currentUser) {
        navigate("/signin2"); // Arahkan ke halaman login jika belum login
        return;
      }

      const userDoc = await getDocs(collection(db, "users"));
      const userRef = userDoc.docs.find(doc => doc.data().email === currentUser.email);
      
      if (!userRef || userRef.data().role !== "admin") {
        navigate("/signin2"); // Arahkan ke halaman login jika bukan admin
      } else {
        setUserEmail(currentUser.email);
      }
    };

    checkAdminStatus(); // Cek status login dan role admin
  }, [navigate]);

  useEffect(() => {
    const fetchTotalWeight = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDonationData(donationsData);

        const total = donationsData.reduce(
          (sum, donation) => sum + parseFloat(donation.weight || 0),
          0
        );
        setTotalWeight(total);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    // Mengambil jumlah tutorial dari koleksi 'kerajinan'
    const fetchTutorialCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "kerajinan"));
        setTutorialCount(querySnapshot.size); // Set jumlah tutorial (kerajinan)
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTotalWeight();
    fetchTutorialCount(); // Panggil fungsi untuk mengambil jumlah tutorial
  }, []);

  // Group donations by waste type
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

  const chartData = Object.entries(groupedData).map(([type, weight]) => ({
    name: type,
    value: weight,
  }));

  const handleBoxClick = () => {
    navigate("/ringkasansampah");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h4 className="dashboard-title">
          Welcome Back, {userEmail ? `${userEmail}!👋🏻` : "Admin"}
        </h4>
  
        {/* Kotak Total Sampah yang Dikumpulkan */}
        <div className="paper-container">
          <div
            className="paper-box"
            onClick={handleBoxClick}
            style={{ cursor: "pointer" }}
          >
            <h6 className="paper-title">Total Sampah yang Berhasil Dikumpulkan:</h6>
            <h4 className="paper-weight">{totalWeight} kg</h4>
          </div>
  
          {/* Kotak Jumlah Sampah yang Daur Ulang */}
          <div
            className="paper-box"
            style={{ cursor: "pointer" }}
          >
            <h6 className="paper-title">Total Kerajinan dari Sampah yang Telah Daur Ulang:</h6>
            <h4 className="paper-weight">{tutorialCount} Kerajinan</h4> {/* Menampilkan jumlah tutorial */}
          </div>
        </div>
  
        {/* Grafik Sampah per Jenis */}
        <h4 style={{ marginTop: "40px" }}>Grafik Sampah per Jenis</h4>
        <ResponsiveContainer width="50%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#B8C4B6" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
