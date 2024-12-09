import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar"; // Panggil Navbar
import Footer from "../../Components/Footer"; // Panggil Footer
import { db } from "../../config/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import fungsi Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication
import { useNavigate } from "react-router-dom"; // Untuk navigasi
import "./FormPendaftaranKegiatan.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null); // Untuk menyimpan data pengguna yang login
  const [showNotification, setShowNotification] = useState(false); // Untuk menyimpan status notifikasi
  const navigate = useNavigate(); // Untuk navigasi ke halaman login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Tambahkan data ke Firestore
      await addDoc(collection(db, "registrations"), formData);
      setMessage("Pendaftaran berhasil!");
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        gender: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error menambahkan data: ", error);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    }

    setIsSubmitting(false);
  };

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Simpan data pengguna yang login
        setShowNotification(false); // Jika sudah login, sembunyikan notifikasi
      } else {
        setUser(null); // Pengguna belum login
        setShowNotification(true); // Tampilkan notifikasi untuk login
        navigate("/signin"); // Arahkan ke halaman login jika belum login
      }
    });
  }, [navigate]);

  if (!user) {
    return (
      <div>
        {/* Panggil Navbar di atas */}
        <Navbar />

        {/* Notifikasi jika pengguna belum login */}
        {showNotification && (
          <div className="notification">
            <p>Anda perlu SignIn terlebih dahulu untuk melakukan pendaftaran.</p>
          </div>
        )}

        <Footer />
      </div>
    );
  }

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
            <label>Jenis Kelamin</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Masukkan Jenis Kelamin"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </main>

      {/* Panggil Footer di bawah */}
      <Footer />
    </div>
  );
};

export default RegistrationForm;
