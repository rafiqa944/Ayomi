import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      {/* Footer Pertama */}
      <footer className="footer-container">
        <div className="find-us">
          <h3 style={{ marginBottom: "10px" }}>Find Us</h3>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaWhatsapp />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaYoutube />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
          </div>
        </div>
      </footer>

      {/* Footer Kedua */}
      <footer className="footer-secondary">
        <div className="footer-content">
        <p className="left-text">&copy; @2024 Ayomi.</p>
        <p className="right-text">&copy; Made with 🤍 by Ayomi.</p>
     </div>
     </footer>
    </>
  );
};

export default Footer;
