import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../config/firebaseConfig";
import { doc, onSnapshot, updateDoc, increment, getDoc, addDoc, collection } from "firebase/firestore";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./AyomiPoint.css";
import iconayomipoints from "../../assets/icon/iconayomipoints.png";
import iconprofile from "../../assets/icon/iconprofile.png";
import dana from "../../assets/foto/dana.png";
import ovo from "../../assets/foto/ovo.png";
import shopeepay from "../../assets/foto/shopeepay.png";
import gopay from "../../assets/foto/gopay.png";
import Alfamart from "../../assets/foto/Alfamart.png";
import Alfamidi from "../../assets/foto/Alfamidi.png";
import Indomaret from "../../assets/foto/Indomaret.png";
import pointban from "../../assets/foto/pointban.png";
import pointmosaik from "../../assets/foto/pointmosaik.png";
import pointperca from "../../assets/foto/pointperca.png";
import pointpot from "../../assets/foto/pointpot.png";
import pointtas from "../../assets/foto/pointtas.png";
import back from "../../assets/foto/back.png";

const AyomiPoint = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [userName, setUserName] = useState("User");
  const [points, setPoints] = useState(0); // Poin pengguna
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);

        // Realtime update for user points
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribePoints = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setPoints(doc.data().points || 0); // Update poin pengguna
          }
        });

        return () => unsubscribePoints();
      } else {
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleExchange = async (pointsToExchange) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Anda perlu login untuk menukar poin.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const currentPoints = userDoc.data().points;

        if (currentPoints >= pointsToExchange) {
          // Kurangi poin pengguna
          await updateDoc(userDocRef, {
            points: increment(-pointsToExchange),
          });

          // Tambahkan transaksi penukaran
          await addDoc(collection(db, "transactions"), {
            userId: currentUser.uid,
            type: "exchange",
            points: pointsToExchange,
            createdAt: new Date(),
            reward: "Saldo Dana",
          });

          alert("Penukaran berhasil!");
        } else {
          alert("Poin Anda tidak mencukupi.");
        }
      } else {
        alert("Data pengguna tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error during exchange: ", error);
      alert("Terjadi kesalahan saat menukar poin.");
    }
  };

  return (
    <div className="ayomipoint">
      <Navbar />
      <div className="undo-container">
        <button className="undo-button" onClick={() => window.history.back()}>
          <img src={back} alt="undo-icon" className="undo-icon" />
        </button>
      </div>
      <div className="ayomipoint-content">
        <div className="info-section">
          <div className="user-info">
            <img src={iconprofile} alt="User Avatar" className="user-avatar" />
            <div className="points-text">
              <p><strong>{userName}</strong></p>
            </div>
          </div>
          <div className="points-info">
            <img src={iconayomipoints} alt="Ayomi Point Icon" className="ayomi-icon" />
            <div className="points-text">
              <p><strong>Ayomi Point</strong></p>
              <p className="points-number">{points}</p>
            </div>
          </div>
        </div>

        <div className="page-title">
          <h1>Tukar Pointmu!</h1>
        </div>

        <div className="feature-items">
          <div
            className={`feature-item ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            <p>Semua</p>
          </div>

          <div
            className={`feature-item ${selectedTab === "ewallet" ? "active" : ""}`}
            onClick={() => handleTabChange("ewallet")}
          >
            <p>E-Wallet</p>
          </div>
          <div
            className={`feature-item ${selectedTab === "voucher" ? "active" : ""}`}
            onClick={() => handleTabChange("voucher")}
          >
            <p>Voucher</p>
          </div>
          <div
            className={`feature-item ${selectedTab === "kerajinan" ? "active" : ""}`}
            onClick={() => handleTabChange("kerajinan")}
          >
            <p>Kerajinan</p>
          </div>
        </div>

        <div className="exchange-section">
          {selectedTab === "all" && (
            <div className="all-sections">
              <div className="ewallet-section">
                {/* E-Wallet Cards */}
                
                <div className="exchange-card">
                  <img src={dana} alt="Dana" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo DANA</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={shopeepay} alt="ShopeePay" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo ShopeePay</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={gopay} alt="Gopay" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Gopay</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={ovo} alt="Ovo" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Ovo</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

              </div>

              <div className="voucher-section">
                {/* Voucher Cards */}
                
                <div className="exchange-card">
                  <img src={Alfamart} alt="Alfamart" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Alfamart</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={Indomaret} alt="Indomaret" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Indomaret</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={Alfamidi} alt="Alfamidi" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Alfamidi</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

              </div>

              <div className="kerajinan-section">
                {/* Kerajinan Cards */}
                
                <div className="exchange-card">
                  <img src={pointban} alt="Point Ban" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Ban</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointmosaik} alt="Point Mosaik" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Mosaik</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointperca} alt="Point Perca" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Perca</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointpot} alt="Point Pot" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Pot</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointtas} alt="Point Tas" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Tas</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>
              </div>
            </div>
          )}
          
          
          {selectedTab === "ewallet" && (
              <div className="ewallet-section">
                <div className="exchange-card">
                  <img src={dana} alt="Dana" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo DANA</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={shopeepay} alt="ShopeePay" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo ShopeePay</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={gopay} alt="Gopay" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Gopay</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={ovo} alt="Ovo" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Ovo</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>
              </div>  
          )}
          
          {selectedTab === "voucher" && (
              <div className="voucher-section">
                <div className="exchange-card">
                  <img src={Alfamart} alt="Alfamart" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Alfamart</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={Alfamidi} alt="Alfamidi" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Alfamidi</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={Indomaret} alt="Indomaret" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Indomaret</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>
              </div>  
          )}
          
          {selectedTab === "kerajinan" && (
              <div className="kerajinan-section">
                <div className="exchange-card">
                  <img src={pointban} alt="Point Ban" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Ban</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointmosaik} alt="Point Mosaik" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Mosaik</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointperca} alt="Point Perca" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Perca</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointpot} alt="Point Pot" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Pot</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>

                <div className="exchange-card">
                  <img src={pointtas} alt="Point Tas" className="exchange-image" />
                  <div className="exchange-details">
                    <p><strong>Tukar poin dengan saldo Point Tas</strong></p>
                    <div className="points-info-horizontal">
                      <img src={iconayomipoints} alt="Ayomi Points Icon" className="icon-points" />
                      <p>10,000 Points</p>
                    </div>
                  </div>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(10000)} // Tukar 10,000 poin
                  >
                    Tukar
                  </button>
                </div>
              </div>  
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AyomiPoint;
