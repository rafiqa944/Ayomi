import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { db, collection, addDoc } from "../../config/firebaseConfig"; // Mengimpor Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import "./FormDonasiSampah.css";

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

  const [user, setUser] = useState(null); // Menyimpan data pengguna yang login
  const navigate = useNavigate(); // Untuk navigasi
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Anda perlu login terlebih dahulu untuk melakukan donasi sampah.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Menyimpan data ke Firestore
      const docRef = await addDoc(collection(db, "donations"), {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        wasteType: formData.wasteType,
        weight: formData.weight,
        notes: formData.notes,
        wasteImage: formData.wasteImage ? formData.wasteImage.name : null, // Menyimpan nama gambar jika ada
      });
      console.log("Document written with ID: ", docRef.id);
      
      // Reset form setelah pengiriman data
      setFormData({
        fullName: '',
        phone: '',
        address: '',
        wasteType: '',
        weight: '',
        notes: '',
        wasteImage: null,
      });
      
      alert("Form berhasil dikirim!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Simpan data pengguna yang login
      } else {
        setUser(null); // Pengguna belum login
        navigate("/signin"); // Arahkan ke halaman login jika belum login
      }
    });
  }, [navigate]);

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="notification">
          <p>Anda perlu login terlebih dahulu untuk melakukan donasi sampah.</p>
        </div>
        <Footer />
      </div>
    );
  }

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
                required
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
                required
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
                required
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
                required
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
                required
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
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </form>
      </main>
      <Footer /> {/* Panggil Footer di bagian bawah */}
    </div>
  );
};

export default DonationForm;
