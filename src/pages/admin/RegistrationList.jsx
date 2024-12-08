// src/pages/RegistrationList.jsx
import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../Components/Sidebar";
import { db } from "../../config/firebaseConfig";

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, registrationId: null });

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "registrations"));
        const registrationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRegistrations(registrationsData);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleDelete = async (registrationId) => {
    try {
      const registrationDocRef = doc(db, "registrations", registrationId);
      await deleteDoc(registrationDocRef);
      setRegistrations(registrations.filter((r) => r.id !== registrationId));
      setConfirmDialog({ isOpen: false, registrationId: null });
    } catch (error) {
      console.error("Failed to delete registration:", error);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "fullName", header: "Nama Lengkap" },
      { accessorKey: "phone", header: "Nomor Telepon" },
      { accessorKey: "address", header: "Alamat" },
      { accessorKey: "gender", header: "Jenis Kelamin" },
      { accessorKey: "reason", header: "Alasan Mengikuti Kegiatan" },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {/* Hanya tombol Delete */}
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() =>
                  setConfirmDialog({ isOpen: true, registrationId: row.original.id })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        size: 100, // Sesuaikan ukuran kolom
      },
    ],
    []
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "calc(100% - 250px)" }}>
        <h2>Daftar Pendaftaran Kegiatan</h2>
        <MaterialReactTable
          columns={columns}
          data={registrations}
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
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false, registrationId: null })}
        >
          <DialogTitle>Hapus Pendaftaran</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Apakah Anda yakin ingin menghapus pendaftaran ini? Tindakan ini tidak dapat
              dibatalkan.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialog({ isOpen: false, registrationId: null })}
            >
              Batal
            </Button>
            <Button
              color="error"
              onClick={() => handleDelete(confirmDialog.registrationId)}
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default RegistrationList;
