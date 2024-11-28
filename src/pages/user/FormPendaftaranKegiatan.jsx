import React, { useState } from "react";
import Navbar from "../../Components/Navbar"; // Panggil Navbar
import Footer from "../../Components/Footer"; // Panggil Footer
import "./FormPendaftaranKegiatan.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      {/* Panggil Navbar di atas */}
      <Navbar />

      {/* Form Pendaftaran */}
      <main className="form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Form Pendaftaran Kegiatan</h2>

          <div className="input-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Masukkan Nama Lengkap"
            />
          </div>

          <div className="input-group">
            <label>Nomor Handphone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Masukkan Nomor Handphone"
            />
          </div>

          <div className="input-group">
            <label>Alamat</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan Alamat"
            />
          </div>

          <div className="input-group">
            <label>Jenis Kelamin</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Masukkan Jenis Kelamin"
            />
          </div>

          <div className="input-group">
            <label>Alasan Mengikuti Kegiatan</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Masukkan Alasan Mengikuti Kegiatan"
            />
          </div>

          <button type="submit" className="submit-button">
            Kirim
          </button>
        </form>
      </main>

      {/* Panggil Footer di bawah */}
      <Footer />
    </div>
  );
};

export default RegistrationForm;
