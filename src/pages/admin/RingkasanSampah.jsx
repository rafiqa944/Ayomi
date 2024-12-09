import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Sidebar from "../../Components/Sidebar";
import "./RingkasanSampah.css"; // Import CSS file

const Summary = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
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
  }, []);

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

export default Summary;
