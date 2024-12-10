import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; // Firebase config import
import { Button } from "@mui/material";
import Sidebar from "../../Components/Sidebar"; // Import Sidebar

const RegistrationList = () => {
  const [events, setEvents] = useState([]); // Data event
  const [volunteers, setVolunteers] = useState([]); // Data volunteer untuk event yang aktif
  const [loading, setLoading] = useState(true);
  const [activeEventId, setActiveEventId] = useState(null); // ID event yang sedang aktif

  // Fetch data events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fetch volunteer data for a specific event
  const fetchVolunteers = async (eventId) => {
    // Jika event yang sama diklik kembali, sembunyikan tabel
    if (eventId === activeEventId) {
      setVolunteers([]);
      setActiveEventId(null);
      return;
    }

    setLoading(true);
    try {
      const volunteerCollection = collection(db, "events", eventId, "volunteer");
      const volunteerSnapshot = await getDocs(volunteerCollection);
      const volunteerData = volunteerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Volunteers data:", volunteerData); // Log untuk memastikan data yang didapat
      setVolunteers(volunteerData);
      setActiveEventId(eventId); // Set event yang aktif
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Columns configuration for MaterialReactTable
  const columns = useMemo(
    () => [
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "alamat", header: "Alamat" },
      { accessorKey: "jeniskelamin", header: "Jenis Kelamin" },
      { accessorKey: "alasan", header: "Alasan" },
      { accessorKey: "email", header: "Email" },
    ],
    []
  );

  // Cari nama event berdasarkan activeEventId
  const activeEvent = events.find((event) => event.id === activeEventId);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "calc(100% - 250px)" }}>
        <h2>Daftar Kegiatan & Pendaftar</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {events.map((event) => (
              <div key={event.id} style={{ marginBottom: "20px" }}>
                <h3>{event.nama_lengkap}</h3>
                <Button
                  onClick={() => fetchVolunteers(event.id)}
                  variant="contained"
                  color={activeEventId === event.id ? "primary" : "default"}
                >
                  {activeEventId === event.id ? "Tampilkan Data" : "Lihat Pendaftar"}
                </Button>
              </div>
            ))}
          </div>
        )}
        {volunteers.length > 0 && activeEvent && (
          <div style={{ marginTop: "20px" }}>
            <h3>Data Volunteer untuk Event: {activeEvent.nama_lengkap}</h3> {/* Tampilkan nama event */}
            <MaterialReactTable
              columns={columns}
              data={volunteers}
              enableEditing={false}
              layoutMode="semantic"
              initialState={{
                density: "compact",
                pagination: { pageSize: 10 },
              }}
              muiTableContainerProps={{
                sx: {
                  maxHeight: "500px",
                  overflow: "auto",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationList;
