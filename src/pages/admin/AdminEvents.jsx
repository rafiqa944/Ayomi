import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../config/firebaseConfig";
import { getAuth } from 'firebase/auth';
import './AdminEvents.css';
import Sidebar from '../../Components/Sidebar';
import { useNavigate } from 'react-router-dom';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    nama_lengkap: '',
    deskripsi: '',
    lokasi: '',
    waktu_mulai: '',
    waktu_selesai: '',
    gambar: '',
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // To store user role
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigate("/signin2"); // Redirect to signin if user is not logged in
        return;
      }

      const userDoc = await getDocs(collection(db, "users"));
      const userRef = userDoc.docs.find(doc => doc.data().email === currentUser.email);

      if (!userRef || userRef.data().role !== "admin") {
        navigate("/signin2"); // Redirect to signin if user is not an admin
        return;
      }

      setUserRole(userRef.data().role); // Set the role to check the admin's status
      fetchEvents(); // Proceed to fetch events if the user is an admin
    };

    checkAuth(); // Check if user is authenticated and is an admin
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      setEvents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching events: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      await addDoc(collection(db, 'events'), {
        ...newEvent,
        waktu_mulai: new Date(newEvent.waktu_mulai),
        waktu_selesai: new Date(newEvent.waktu_selesai),
      });
      setNewEvent({ nama_lengkap: '', deskripsi: '', lokasi: '', waktu_mulai: '', waktu_selesai: '', gambar: '' });
      window.location.reload(); // Reload to show updated events
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      if (editingEventId) {
        await updateDoc(doc(db, 'events', editingEventId), {
          ...newEvent,
          waktu_mulai: new Date(newEvent.waktu_mulai),
          waktu_selesai: new Date(newEvent.waktu_selesai),
        });
        setNewEvent({ nama_lengkap: '', deskripsi: '', lokasi: '', waktu_mulai: '', waktu_selesai: '', gambar: '' });
        setEditingEventId(null); // Reset editing state
        window.location.reload(); // Reload to show updated event
      }
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  const handleEditEvent = (event) => {
    setNewEvent({
      nama_lengkap: event.nama_lengkap,
      deskripsi: event.deskripsi,
      lokasi: event.lokasi,
      waktu_mulai: event.waktu_mulai.seconds ? new Date(event.waktu_mulai.seconds * 1000).toISOString().slice(0, 16) : '',
      waktu_selesai: event.waktu_selesai.seconds ? new Date(event.waktu_selesai.seconds * 1000).toISOString().slice(0, 16) : '',
      gambar: event.gambar,
    });
    setEditingEventId(event.id); // Set the event ID for editing
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while checking authentication and fetching data
  }

  return (
    <div className="admin-events">
      <Sidebar />
      <h1>Manage Events</h1>

      <div className="add-event-form">
        <h2>{editingEventId ? 'Edit Event' : 'Add New Event'}</h2>
        <input
          type="text"
          name="nama_lengkap"
          placeholder="Event Name"
          value={newEvent.nama_lengkap}
          onChange={handleInputChange}
        />
        <textarea
          name="deskripsi"
          placeholder="Description"
          value={newEvent.deskripsi}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          name="lokasi"
          placeholder="Location"
          value={newEvent.lokasi}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="waktu_mulai"
          value={newEvent.waktu_mulai}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="waktu_selesai"
          value={newEvent.waktu_selesai}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="gambar"
          placeholder="Image URL"
          value={newEvent.gambar}
          onChange={handleInputChange}
        />
        <button onClick={editingEventId ? handleUpdateEvent : handleAddEvent}>
          {editingEventId ? 'Update Event' : 'Add Event'}
        </button>
      </div>

      <div className="events-list">
        <h2>Existing Events</h2>
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.nama_lengkap}</h3>
            <p>{event.deskripsi}</p>
            <p>Location: {event.lokasi}</p>
            <p>Start: {new Date(event.waktu_mulai.seconds * 1000).toLocaleString()}</p>
            <p>End: {new Date(event.waktu_selesai.seconds * 1000).toLocaleString()}</p>
            {event.gambar && <img src={event.gambar} alt={event.nama_lengkap} />}
            <div className="event-actions">
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              <button onClick={() => handleEditEvent(event)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
