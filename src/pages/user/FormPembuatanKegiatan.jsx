import React, { useState } from "react";
import Navbar from "../../Components/Navbar"; // Sesuaikan path file Navbar
import Footer from "../../Components/Footer"; // Sesuaikan path file Footer
import "./FormPembuatanKegiatan.css";

const FormPembuatanKegiatan = () => {
  const [formData, setFormData] = useState({
    activityName: "",
    description: "",
    date: "",
    address: "",
    groupLink: "",
    expectedParticipants: "",
    contact: "",
    activityImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      activityImage: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Form Pembuatan Kegiatan</h2>
          <div className="form-grid">
            <div className="input-group">
              <label>Nama Kegiatan</label>
              <input
                type="text"
                name="activityName"
                value={formData.activityName}
                onChange={handleChange}
                placeholder="Masukkan Nama Kegiatan"
              />
            </div>

            <div className="input-group">
              <label>Deskripsi Kegiatan</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan Deskripsi Kegiatan"
              />
            </div>

            <div className="input-group">
              <label>Tanggal Kegiatan</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Foto Kegiatan</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="input-group">
              <label>Alamat Kegiatan</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan Alamat Kegiatan"
              />
            </div>

            <div className="input-group">
              <label>Prediksi Jumlah Peserta</label>
              <input
                type="text"
                name="expectedParticipants"
                value={formData.expectedParticipants}
                onChange={handleChange}
                placeholder="Masukkan Prediksi Jumlah Peserta"
              />
            </div>

            <div className="input-group">
              <label>Link Grup Kegiatan</label>
              <input
                type="text"
                name="groupLink"
                value={formData.groupLink}
                onChange={handleChange}
                placeholder="Masukkan Link Grup Kegiatan"
              />
            </div>

            <div className="input-group">
              <label>Kontak Pembuat Kegiatan</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Masukkan Kontak Pembuat Kegiatan"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Daftar</button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FormPembuatanKegiatan;
