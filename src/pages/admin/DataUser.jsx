import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../Components/Sidebar";

const DataUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, userId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = getAuth().currentUser;

      // Redirect to signin if not logged in or if not an admin
      if (!user) {
        navigate("/signin2");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDocs(userDocRef);
      
      if (userDoc.exists() && userDoc.data().role !== "admin") {
        navigate("/signin2"); // Redirect if not admin
      }
    };

    checkAuth(); // Check auth status on page load
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      setUsers(users.filter((u) => u.id !== userId));
      setConfirmDialog({ isOpen: false, userId: null });
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "username", header: "Username" },
      { accessorKey: "fullName", header: "Nama" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "address", header: "Alamat" },
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
                  setConfirmDialog({ isOpen: true, userId: row.original.id })
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
        <h2>Data User</h2>
        <MaterialReactTable
          columns={columns}
          data={users}
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
          onClose={() => setConfirmDialog({ isOpen: false, userId: null })}
        >
          <DialogTitle>Hapus User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat
              dibatalkan.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialog({ isOpen: false, userId: null })}
            >
              Batal
            </Button>
            <Button
              color="error"
              onClick={() => handleDelete(confirmDialog.userId)}
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DataUser;
