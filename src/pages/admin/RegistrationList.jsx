import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; // Pastikan path ini mengarah ke konfigurasi Firebase Anda
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

const RegistrationList = () => {
  const [events, setEvents] = useState([]); // Data semua event
  const [selectedEvent, setSelectedEvent] = useState(null); // Event yang dipilih
  const [registrations, setRegistrations] = useState([]); // Data pendaftar pada event terpilih

  // Fetch daftar event dari Firestore
  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  // Fetch data user pendaftar untuk event yang dipilih
  useEffect(() => {
    if (!selectedEvent) return;

    const q = query(collection(db, `events/${selectedEvent}/volunteer`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRegistrations(usersData);
    });

    return () => unsubscribe();
  }, [selectedEvent]);

  // Kolom untuk tabel pendaftar
  const registrationColumns = [
    { accessorKey: "nama", header: "Nama" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "alamat", header: "Alamat" },
    { accessorKey: "jeniskelamin", header: "Jenis Kelamin" },
    { accessorKey: "alasan", header: "Alasan" },
    { accessorKey: "phone", header: "Telepon" },
  ];

  return (
    <div>
      <h1>Daftar Event</h1>
      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            onClick={() => setSelectedEvent(event.id)}
          >
            {event.name}
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <>
          <h2>Registrations for: {events.find((e) => e.id === selectedEvent)?.name}</h2>
          <Table data={registrations} columns={registrationColumns} />
        </>
      )}
    </div>
  );
};

// Komponen tabel generik
const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table border="1">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.isPlaceholder ? null : header.renderHeader()}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegistrationList;
