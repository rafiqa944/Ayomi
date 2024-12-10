import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './AdminTutorial.css'; 
import Sidebar from '../../Components/Sidebar';

const AdminTutorial = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTutorial, setNewTutorial] = useState({
    nama: '',
    deskripsi: '',
    gambar: '',
    bahan: '',
    step: '',
    linkvideotutorial: '',
  });
  const [editingTutorialId, setEditingTutorialId] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Check if the user is logged in and is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // If user is not logged in, redirect to sign-in page
        navigate("/signin2");
        return;
      }

      const userDoc = await getDocs(collection(db, 'users'));
      const userRef = userDoc.docs.find(doc => doc.data().email === currentUser.email);
      
      if (!userRef || userRef.data().role !== "admin") {
        // If user is not admin, redirect to sign-in page
        navigate("/signin2");
      }
    };

    checkAdmin();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'kerajinan'));
        setTutorials(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching tutorials: ", error);
      }
    };
    fetchTutorials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTutorial({ ...newTutorial, [name]: value });
  };

  const handleAddTutorial = async () => {
    try {
      const bahanArray = newTutorial.bahan.split('\n').filter(b => b.trim() !== ''); 
      const stepArray = newTutorial.step.split('\n').filter(s => s.trim() !== ''); 

      await addDoc(collection(db, 'kerajinan'), {
        ...newTutorial,
        bahan: bahanArray,
        step: stepArray,
      });

      setNewTutorial({
        nama: '',
        deskripsi: '',
        gambar: '',
        bahan: '',
        step: '',
        linkvideotutorial: '',
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding tutorial: ", error);
    }
  };

  const handleDeleteTutorial = async (id) => {
    try {
      await deleteDoc(doc(db, 'kerajinan', id));
      setTutorials(tutorials.filter(tutorial => tutorial.id !== id));
    } catch (error) {
      console.error("Error deleting tutorial: ", error);
    }
  };

  const handleUpdateTutorial = async () => {
    try {
      if (editingTutorialId) {
        const bahanArray = newTutorial.bahan.split('\n').filter(b => b.trim() !== '');
        const stepArray = newTutorial.step.split('\n').filter(s => s.trim() !== '');

        await updateDoc(doc(db, 'kerajinan', editingTutorialId), {
          ...newTutorial,
          bahan: bahanArray,
          step: stepArray,
        });

        setNewTutorial({
          nama: '',
          deskripsi: '',
          gambar: '',
          bahan: '',
          step: '',
          linkvideotutorial: '',
        });
        setEditingTutorialId(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating tutorial: ", error);
    }
  };

  const handleEditTutorial = (tutorial) => {
    setNewTutorial({
      nama: tutorial.nama,
      deskripsi: tutorial.deskripsi,
      gambar: tutorial.gambar,
      bahan: tutorial.bahan.join('\n'),
      step: tutorial.step.join('\n'),
      linkvideotutorial: tutorial.linkvideotutorial,
    });
    setEditingTutorialId(tutorial.id);
  };

  return (
    <div className="admin-tutorial">
      <Sidebar />
      <h1>Manage Tutorials</h1>

      <div className="add-tutorial-form">
        <h2>{editingTutorialId ? 'Edit Tutorial' : 'Add New Tutorial'}</h2>
        <input
          type="text"
          name="nama"
          placeholder="Tutorial Name"
          value={newTutorial.nama}
          onChange={handleInputChange}
        />
        <textarea
          name="deskripsi"
          placeholder="Description"
          value={newTutorial.deskripsi}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          name="gambar"
          placeholder="Image URL"
          value={newTutorial.gambar}
          onChange={handleInputChange}
        />
        <textarea
          name="bahan"
          placeholder="Materials (one per line)"
          value={newTutorial.bahan}
          onChange={handleInputChange}
        ></textarea>
        <textarea
          name="step"
          placeholder="Steps (one per line)"
          value={newTutorial.step}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          name="linkvideotutorial"
          placeholder="Video Tutorial Link"
          value={newTutorial.linkvideotutorial}
          onChange={handleInputChange}
        />
        <button onClick={editingTutorialId ? handleUpdateTutorial : handleAddTutorial}>
          {editingTutorialId ? 'Update Tutorial' : 'Add Tutorial'}
        </button>
      </div>

      <div className="tutorial-list">
        <h2>Existing Tutorials</h2>
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="tutorial-item">
            <h3>{tutorial.nama}</h3>
            <p>{tutorial.deskripsi}</p>
            <p>Materials:</p>
            <ul>
              {tutorial.bahan.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>Steps:</p>
            <ol>
              {tutorial.step.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
            {tutorial.gambar && <img src={tutorial.gambar} alt={tutorial.nama} />}
            <p>
              Video Tutorial:{" "}
              <a href={tutorial.linkvideotutorial} target="_blank" rel="noopener noreferrer">
                Watch here
              </a>
            </p>
            <div className="tutorial-actions">
              <button onClick={() => handleDeleteTutorial(tutorial.id)}>Delete</button>
              <button onClick={() => handleEditTutorial(tutorial)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTutorial;
