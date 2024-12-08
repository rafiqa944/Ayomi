// import React, { useState, useEffect } from "react";
// import { db, storage } from "../../config/firebaseConfig"; // Import konfigurasi Firebase
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import "./AdminTutorial.css"; // Import file CSS

// const AdminPage = () => {
//   const [tutorials, setTutorials] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     type: "",
//     description: "",
//     image: null,
//     videoLink: "",
//   });

//   const tutorialsCollectionRef = collection(db, "tutorials");

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getDocs(tutorialsCollectionRef);
//       setTutorials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setForm({ ...form, image: e.target.files[0] });
//   };

//   const handleAddTutorial = async () => {
//     if (form.image) {
//       // Langkah 1: Unggah gambar ke Firebase Storage
//       const imageRef = ref(storage, `images/${form.image.name}`);
//       try {
//         await uploadBytes(imageRef, form.image);
//         const imageUrl = await getDownloadURL(imageRef); // Mendapatkan URL gambar yang telah diunggah

//         // Langkah 2: Tambahkan detail tutorial ke Firestore
//         await addDoc(tutorialsCollectionRef, {
//           title: form.title,
//           type: form.type,
//           description: form.description,
//           image: imageUrl,
//           videoLink: form.videoLink,
//         });

//         // Reset form setelah tutorial ditambahkan
//         setForm({ title: "", type: "", description: "", image: null, videoLink: "" });

//         // Opsional: Memuat ulang data tanpa me-refresh halaman
//         const data = await getDocs(tutorialsCollectionRef);
//         setTutorials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       } catch (error) {
//         console.error("Error menambahkan tutorial:", error);
//         alert("Terjadi kesalahan saat menambahkan tutorial.");
//       }
//     } else {
//       alert("Harap unggah gambar.");
//     }
//   };

//   const handleDeleteTutorial = async (id) => {
//     try {
//       const tutorialDoc = doc(db, "tutorials", id);
//       await deleteDoc(tutorialDoc);
      
//       // Opsional: Memuat ulang data setelah penghapusan
//       const data = await getDocs(tutorialsCollectionRef);
//       setTutorials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     } catch (error) {
//       console.error("Error menghapus tutorial:", error);
//       alert("Terjadi kesalahan saat menghapus tutorial.");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1>Halaman Admin</h1>

//       <div className="form-container">
//         <h2>Tambahkan Tutorial Baru</h2>
//         <input
//           type="text"
//           name="title"
//           placeholder="Judul"
//           value={form.title}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Tipe"
//           value={form.type}
//           onChange={handleInputChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Deskripsi"
//           value={form.description}
//           onChange={handleInputChange}
//         />
//         <input type="file" onChange={handleFileChange} />
//         <input
//           type="text"
//           name="videoLink"
//           placeholder="Link Video"
//           value={form.videoLink}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleAddTutorial}>Tambah Tutorial</button>
//       </div>

//       <div className="table-container">
//         <h2>Tutorials</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Judul</th>
//               <th>Tipe</th>
//               <th>Deskripsi</th>
//               <th>Gambar</th>
//               <th>Link Video</th>
//               <th>Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tutorials.map((tutorial) => (
//               <tr key={tutorial.id}>
//                 <td>{tutorial.title}</td>
//                 <td>{tutorial.type}</td>
//                 <td>{tutorial.description}</td>
//                 <td>
//                   <img src={tutorial.image} alt={tutorial.title} width="100" />
//                 </td>
//                 <td>
//                   <a href={tutorial.videoLink} target="_blank" rel="noopener noreferrer">
//                     Lihat Video
//                   </a>
//                 </td>
//                 <td>
//                   <button onClick={() => handleDeleteTutorial(tutorial.id)}>
//                     Hapus
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
