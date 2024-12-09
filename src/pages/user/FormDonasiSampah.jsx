// import React, { useState, useEffect } from "react";
// import Navbar from "../../Components/Navbar";
// import Footer from "../../Components/Footer";
// import { db, collection, addDoc } from "../../config/firebaseConfig"; // Firestore config
// import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
// import { useNavigate } from "react-router-dom";
// import "./FormDonasiSampah.css";

// const DonationForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     wasteType: "",
//     weight: "",
//     notes: "",
//     wasteImage: null,
//   });

//   const [user, setUser] = useState(null); // User data
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       wasteImage: e.target.files[0],
//     });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert("Anda perlu login terlebih dahulu untuk melakukan donasi sampah.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       // Save data to Firestore
//       const docRef = await addDoc(collection(db, "donations"), {
//         fullName: formData.fullName,
//         phone: formData.phone,
//         address: formData.address,
//         wasteType: formData.wasteType, // Dropdown value
//         weight: formData.weight,
//         notes: formData.notes,
//         wasteImage: formData.wasteImage ? formData.wasteImage.name : null, // Save image name
//         createdAt: new Date(),
//         userId: user.uid, // Link to user ID
//       });

//       console.log("Document written with ID: ", docRef.id);

//       // Reset form
//       setFormData({
//         fullName: "",
//         phone: "",
//         address: "",
//         wasteType: "",
//         weight: "",
//         notes: "",
//         wasteImage: null,
//       });

//       alert("Form berhasil dikirim!");
//     } catch (e) {
//       console.error("Error adding document: ", e);
//       alert("Terjadi kesalahan, coba lagi.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Check user authentication
//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//         navigate("/signin"); // Redirect to login
//       }
//     });
//   }, [navigate]);

//   if (!user) {
//     return (
//       <div>
//         <Navbar />
//         <div className="notification">
//           <p>Anda perlu login terlebih dahulu untuk melakukan donasi sampah.</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <main className="form-wrapper">
//         <form className="form-container" onSubmit={handleSubmit}>
//           <h2 className="form-title">Form Donasi Sampah</h2>
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Nama Lengkap</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="Masukkan Nama Lengkap"
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Alamat</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Masukkan Alamat"
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Nomor Handphone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Masukkan Nomor Handphone"
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label>Jenis Sampah</label>
//               <select
//                 name="wasteType"
//                 value={formData.wasteType}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Pilih Jenis Sampah</option>
//                 <option value="Sampah Kertas">Sampah Kertas</option>
//                 <option value="Plastik">Plastik</option>
//                 <option value="Aluminium">Aluminium</option>
//                 <option value="Besi & Logam">Besi & Logam</option>
//                 <option value="Elektronik">Elektronik</option>
//                 <option value="Botol Kaca">Botol Kaca</option>
//                 <option value="Merek">Merek</option>
//                 <option value="Khusus">Khusus</option>
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Foto Sampah</label>
//               <input type="file" onChange={handleFileChange} />
//             </div>

//             <div className="input-group">
//               <label>Berat (kg)</label>
//               <input
//                 type="number"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 placeholder="Masukkan Berat"
//                 required
//               />
//             </div>
//           </div>

//           <div className="input-group">
//             <label>Catatan Tambahan</label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               placeholder="Masukkan Catatan Tambahan"
//             />
//           </div>

//           <button type="submit" className="submit-button" disabled={isSubmitting}>
//             {isSubmitting ? "Mengirim..." : "Kirim"}
//           </button>
//         </form>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default DonationForm;

import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { db, collection, addDoc } from "../../config/firebaseConfig"; // Firestore config
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { useNavigate } from "react-router-dom";
import "./FormDonasiSampah.css";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    wasteType: "",
    weight: "",
    notes: "",
    wasteImage: null,
  });

  const [user, setUser] = useState(null); // User data
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      wasteImage: e.target.files[0],
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Anda perlu login terlebih dahulu untuk melakukan donasi sampah.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Save data to Firestore
      const docRef = await addDoc(collection(db, "donations"), {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        wasteType: formData.wasteType, // Dropdown value
        weight: formData.weight,
        notes: formData.notes,
        wasteImage: formData.wasteImage ? formData.wasteImage.name : null, // Save image name
        createdAt: new Date(),
        userId: user.uid, // Link to user ID
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        wasteType: "",
        weight: "",
        notes: "",
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

  // Check user authentication
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        navigate("/signin"); // Redirect to login
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
      <Navbar />
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
              <select
                name="wasteType"
                value={formData.wasteType}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Jenis Sampah</option>
                <option value="Sampah Kertas">Sampah Kertas</option>
                <option value="Plastik">Plastik</option>
                <option value="Aluminium">Aluminium</option>
                <option value="Besi & Logam">Besi & Logam</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Botol Kaca">Botol Kaca</option>
                <option value="Merek">Merek</option>
                <option value="Khusus">Khusus</option>
              </select>
            </div>

            <div className="input-group">
              <label>Foto Sampah</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="input-group">
              <label>Berat (kg)</label>
              <input
                type="number"
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
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default DonationForm;