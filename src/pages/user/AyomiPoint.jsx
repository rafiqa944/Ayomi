import React from "react";
import back from '../../assets/foto/back.png';
import Navbar from "../../Components/Navbar"; // Pastikan path benar
import Footer from "../../Components/Footer";
import "./AyomiPoint.css";

const AyomiPoint = () => {
  return (
    <div className="aboutus">
      <Navbar />
      <div className="undo-container">
        <button className="undo-button" onClick={() => window.history.back()}>
        <img 
            src={back}
            alt="undo-icon" 
            className="undo-icon" 
        />
        </button>
    </div>
        <div className="text-container">
            <div className="text-lagi">
                <h2>Rafiqa Nurcahyani Ibrahim</h2>
                <p>
                    Yuk daur ulang sampahmu
                </p>
            </div>
            <div className="text-lagi-dua">
                <h2>Ayomi Point</h2>
                <p>
                    0 
                </p>
            </div>
        </div>
      <Footer/>
    </div>
  );
};

export default AyomiPoint;