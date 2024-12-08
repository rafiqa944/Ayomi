import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import iconprofile from "../../assets/icon/iconprofile.png";
import qrCode from "../../assets/icon/qrCode.png";
import QRCode from "react-qr-code"; // Import QRCode component
import { auth, db } from "../../config/firebaseConfig"; // Firebase configuration
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore operations
import { updateEmail } from "firebase/auth"; // Firebase Authentication
import './UbahProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    birthDate: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.error("No user data found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);

        // Update Firestore
        await updateDoc(docRef, userData);

        // Update email in Firebase Authentication
        if (userData.email !== user.email) {
          await updateEmail(user, userData.email);
        }

        alert("Profil berhasil diperbarui!");
      } else {
        alert("Pengguna tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ubah-profile">
      <Navbar />
      <div className="teks-ubah-profile" style={{ color: '#344C3D' }}>
        <h1>Ubah Profile</h1>
      </div>

      <div className="profile-container">
        <div className="profile-picture">
          <img src={iconprofile} alt="Profile Icon" className="profile-icon" />
          <h2 className="profile-name">{userData.fullName || "User"}</h2>
        </div>
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nama Lengkap:</label>
              <input
                type="text"
                id="fullName"
                value={userData.fullName}
                onChange={handleChange}
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Nomor Handphone:</label>
              <input
                type="text"
                id="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Nomor Handphone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Jenis Kelamin:</label>
              <select
                id="gender"
                value={userData.gender}
                onChange={handleChange}
              >
                <option value="Female">Perempuan</option>
                <option value="Male">Laki-laki</option>
                <option value="Other">Lainnya</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Tanggal Lahir:</label>
              <input
                type="date"
                id="birthDate"
                value={userData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Alamat:</label>
              <textarea
                id="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Alamat"
              />
            </div>
            <button type="submit" className="save-button">
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>

      {/* Display QR Code */}
      <div className="qr-code-container">
        <h3>QR Code:</h3> <br/>
        <QRCode value={userData.email} /> {/* Displaying QR Code for user's email */}
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
