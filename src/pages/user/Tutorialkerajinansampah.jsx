import React, { useState, useEffect } from "react";
import './Tutorialkerajinansampah.css'; 
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../../config/firebaseConfig';  // Impor konfigurasi Firebase
import back from '../../assets/foto/back.png';  // Ikon tombol kembali

const Tutorialkerajinansampah = () => {
    const [tutorialData, setTutorialData] = useState(null);  // State untuk menyimpan data tutorial
    const [loading, setLoading] = useState(true);  // State untuk menangani loading
    const [error, setError] = useState(null);  // State untuk menangani error

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ambil data dari Firestore menggunakan path yang sudah ditentukan
                const docRef = doc(db, "kerajinan", "1QurM8fedr0yKvB6rdZp");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setTutorialData(docSnap.data());
                } else {
                    console.error("No such document!");
                }
            } catch (err) {
                setError("Error fetching data: " + err.message);
            } finally {
                setLoading(false);  // Set loading ke false setelah data selesai di-fetch
            }
        };

        fetchData();
    }, []);

    // Jika data masih loading
    if (loading) {
        return <p>Loading...</p>;
    }

    // Jika terjadi error
    if (error) {
        return <p>{error}</p>;
    }

    // Menampilkan data jika berhasil diambil
    return (
        <div>
            <Navbar />
            <div className="back-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    <img 
                        src={back}
                        alt="back-icon" 
                        className="back-icon" 
                    />
                </button>
            </div>
            <div className="text">
                <h2>{tutorialData.tittle}</h2>
                <p>{tutorialData.description}</p>
            </div>
            <div className="foto-pot">
                <img src={tutorialData.pictures} alt="tutorial pot" className="foto-pot"/>
            </div>
            <div>
                <p className="Bahan">Bahan-bahan yang diperlukan:</p>
                <ol className="list-bahan">
                    {tutorialData.materials && tutorialData.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                    ))}
                </ol>
            </div>
            <div>
                <p className="langkah">Langkah-langkahnya:</p>
                <ol className="urutan-langkah">
                    {tutorialData.steps && tutorialData.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
                <div className="link">
                    <h2>Link video tutorial:</h2>
                    <a href={tutorialData.videoLink} target="_blank" rel="noopener noreferrer">{tutorialData.videoLink}</a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Tutorialkerajinansampah;
