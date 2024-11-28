import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import './FormDonasiSampah.css';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    wasteType: '',
    weight: '',
    notes: '',
    wasteImage: null,
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
      wasteImage: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <Navbar /> {/* Panggil Navbar di bagian atas */}
      <main className="form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Form Donasi Sampah</h2>
          <div className="form-grid">
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
              <label>Jenis Sampah</label>
              <input
                type="text"
                name="wasteType"
                value={formData.wasteType}
                onChange={handleChange}
                placeholder="Masukkan Jenis Sampah"
              />
            </div>

            <div className="input-group">
              <label>Foto Sampah</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="input-group">
              <label>Berat</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Masukkan Berat"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Catatan Tambahan</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Masukkan Catatan Tambahan"
            />
          </div>

          <button type="submit" className="submit-button">Kirim</button>
        </form>
      </main>
      <Footer /> {/* Panggil Footer di bagian bawah */}
    </div>
  );
};

export default DonationForm;