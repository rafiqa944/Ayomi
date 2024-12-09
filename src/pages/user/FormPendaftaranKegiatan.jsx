import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams untuk menangkap parameter URL
import { db } from "../../config/firebaseConfig"; // Import Firestore
import { addDoc, collection, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./FormPendaftaranKegiatan.css";

const FormPendaftaranKegiatan = () => {
  const { eventId } = useParams();  // Ambil ID event dari URL
  const [event, setEvent] = useState(null); // State untuk menyimpan data event
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    reason: "",
    email: "", // Tambahkan email di form data
  });
  const [message, setMessage] = useState("");

  // Ambil data event berdasarkan eventId
  useEffect(() => {
    const fetchEvent = async () => {
      const eventRef = doc(db, "events", eventId);  // Ambil dokumen event berdasarkan eventId
      const eventDoc = await getDoc(eventRef);
      if (eventDoc.exists()) {
        setEvent(eventDoc.data());  // Set data event
      } else {
        console.log("Event tidak ditemukan");
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Pendaftaran berhasil!");

    try {
      // Menambahkan data pendaftaran ke koleksi volunteer untuk event tertentu
      await addDoc(collection(db, "events", eventId, "volunteer"), {
        nama: formData.fullName,
        phone: formData.phone,
        alamat: formData.address,
        jeniskelamin: formData.gender,
        alasan: formData.reason,
        email: formData.email, // Jika email ditambahkan di formData
      });
      setMessage("Pendaftaran berhasil!");
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        gender: "",
        reason: "",
        email: "" // Kosongkan email jika ada di formData
      });
    } catch (error) {
      console.error("Error menambahkan data: ", error);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  if (!event) {
    return <div>Loading...</div>;  // Tampilkan loading jika data event belum diambil
  }

  return (
    <div>
      <Navbar />
      <main className="form-wrapper">
        {/* Judul form berada di atas form */}
        <h2 className="form-title">Form Pendaftaran Kegiatan: <span className="event-title">{event.nama_lengkap}</span></h2>

        <form className="form-container" onSubmit={handleSubmit}>
          {/* Form input */}
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

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan Email"
              required
            />
          </div>

          <button type="submit" className="submit-button">Kirim</button>
        </form>

        {message && <p>{message}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default FormPendaftaranKegiatan;
