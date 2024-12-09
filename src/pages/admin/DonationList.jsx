// import React, { useState, useEffect, useMemo } from "react";
// import { MaterialReactTable } from "material-react-table";
// import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Sidebar from "../../Components/Sidebar";
// import { db } from "../../config/firebaseConfig";

// const DonationList = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, donationId: null });
//   const [totalWeight, setTotalWeight] = useState(0); // State for total weight
//   const [selectedStatus, setSelectedStatus] = useState('Semua'); // Filter by status

//   useEffect(() => {
//     const fetchDonations = async () => {
//       setLoading(true);
//       try {
//         const querySnapshot = await getDocs(collection(db, "donations"));
//         const donationsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDonations(donationsData);

//         // Calculate the total weight of donations
//         const total = donationsData.reduce((sum, donation) => sum + parseFloat(donation.weight || 0), 0);
//         setTotalWeight(total); // Update total weight
//       } catch (error) {
//         console.error("Error fetching donations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   // Handle status change
//   const handleStatusChange = async (donationId, newStatus) => {
//     try {
//       const donationDocRef = doc(db, "donations", donationId);
//       await updateDoc(donationDocRef, {
//         status: newStatus,
//       });

//       // Update the status locally
//       setDonations(donations.map((donation) => 
//         donation.id === donationId ? { ...donation, status: newStatus } : donation
//       ));
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   // Handle donation deletion
//   const handleDelete = async (donationId) => {
//     try {
//       const donationDocRef = doc(db, "donations", donationId);
//       await deleteDoc(donationDocRef);
//       setDonations(donations.filter((d) => d.id !== donationId));
//       setConfirmDialog({ isOpen: false, donationId: null });

//       // Recalculate the total weight after deletion
//       const newTotal = donations.filter((d) => d.id !== donationId).reduce((sum, donation) => sum + parseFloat(donation.weight || 0), 0);
//       setTotalWeight(newTotal);
//     } catch (error) {
//       console.error("Failed to delete donation:", error);
//     }
//   };

//   // Filter donations based on the selected status
//   const filteredDonations = donations.filter((donation) => {
//     if (selectedStatus === 'Semua') return true;
//     return donation.status === selectedStatus;
//   });

//   const columns = useMemo(
//     () => [
//       { accessorKey: "fullName", header: "Nama Lengkap" },
//       { accessorKey: "address", header: "Alamat" },
//       { accessorKey: "phone", header: "Nomor Telepon" },
//       { accessorKey: "wasteType", header: "Jenis Sampah" },
//       {
//         accessorKey: "wastePhoto",
//         header: "Foto Sampah",
//         Cell: ({ row }) => (
//           <img
//             src={row.original.wastePhoto} 
//             alt="Waste"
//             style={{ width: "100px", height: "100px", objectFit: "cover" }}
//           />
//         ),
//       },
//       { accessorKey: "weight", header: "Berat (kg)" },
//       { accessorKey: "notes", header: "Catatan Tambahan" },
//       {
//         accessorKey: "status",
//         header: "Status",
//         Cell: ({ row }) => (
//           <Select
//             value={row.original.status || 'Dalam Perjalanan'}
//             onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
//             size="small"
//           >
//             <MenuItem value="Dalam Perjalanan">Dalam Perjalanan</MenuItem>
//             <MenuItem value="Selesai">Selesai</MenuItem>
//             <MenuItem value="Dibatalkan">Dibatalkan</MenuItem>
//           </Select>
//         ),
//         size: 150,
//       },
//       {
//         accessorKey: "actions",
//         header: "Actions",
//         Cell: ({ row }) => (
//           <Box sx={{ display: "flex", gap: "1rem" }}>
//             <Tooltip title="Delete">
//               <IconButton
//                 color="error"
//                 onClick={() =>
//                   setConfirmDialog({ isOpen: true, donationId: row.original.id })
//                 }
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         ),
//         size: 100,
//       },
//     ],
//     []
//   );

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ marginLeft: "250px", padding: "20px", width: "calc(100% - 250px)" }}>
//         <h2>Daftar Donasi Sampah</h2>
        
//         {/* Filter Status */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//           <Select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             size="small"
//             sx={{ minWidth: 150 }}
//           >
//             <MenuItem value="Semua">Semua</MenuItem>
//             <MenuItem value="Dalam Perjalanan">Dalam Perjalanan</MenuItem>
//             <MenuItem value="Selesai">Selesai</MenuItem>
//             <MenuItem value="Dibatalkan">Dibatalkan</MenuItem>
//           </Select>
//         </Box>

//         <MaterialReactTable
//           columns={columns}
//           data={filteredDonations}
//           enableEditing={false}
//           layoutMode="semantic"
//           initialState={{
//             density: "compact",
//             pagination: { pageSize: 10 },
//           }}
//           muiTableContainerProps={{
//             sx: {
//               maxHeight: "500px",
//               overflow: "auto",
//             },
//           }}
//         />

//         <h3>Total Berat Donasi: {totalWeight} kg</h3> {/* Display the total weight */}

//         {/* Delete Confirmation Dialog */}
//         <Dialog
//           open={confirmDialog.isOpen}
//           onClose={() => setConfirmDialog({ isOpen: false, donationId: null })}
//         >
//           <DialogTitle>Hapus Donasi</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Apakah Anda yakin ingin menghapus donasi ini? Tindakan ini tidak dapat
//               dibatalkan.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => setConfirmDialog({ isOpen: false, donationId: null })}
//             >
//               Batal
//             </Button>
//             <Button
//               color="error"
//               onClick={() => handleDelete(confirmDialog.donationId)}
//             >
//               Hapus
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default DonationList;

import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../Components/Sidebar";
import { db } from "../../config/firebaseConfig";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, donationId: null });
  const [totalWeight, setTotalWeight] = useState(0); // State for total weight

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(donationsData);

        // Calculate the total weight of donations
        const total = donationsData.reduce((sum, donation) => sum + parseFloat(donation.weight || 0), 0);
        setTotalWeight(total); // Update total weight
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleDelete = async (donationId) => {
    try {
      const donationDocRef = doc(db, "donations", donationId);
      await deleteDoc(donationDocRef);
      setDonations(donations.filter((d) => d.id !== donationId));
      setConfirmDialog({ isOpen: false, donationId: null });

      // Recalculate the total weight after deletion
      const newTotal = donations.filter((d) => d.id !== donationId).reduce((sum, donation) => sum + parseFloat(donation.weight || 0), 0);
      setTotalWeight(newTotal);
    } catch (error) {
      console.error("Failed to delete donation:", error);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "fullName", header: "Nama Lengkap" },
      { accessorKey: "address", header: "Alamat" },
      { accessorKey: "phone", header: "Nomor Telepon" },
      { accessorKey: "wasteType", header: "Jenis Sampah" },
      {
        accessorKey: "wastePhoto",
        header: "Foto Sampah",
        Cell: ({ row }) => (
          <img
            src={row.original.wastePhoto} 
            alt="Waste"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ),
      },
      { accessorKey: "weight", header: "Berat (kg)" },
      { accessorKey: "notes", header: "Catatan Tambahan" },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() =>
                  setConfirmDialog({ isOpen: true, donationId: row.original.id })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        size: 100,
      },
    ],
    []
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", width: "calc(100% - 250px)" }}>
        <h2>Daftar Donasi Sampah</h2>
        <MaterialReactTable
          columns={columns}
          data={donations}
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
        <h3>Total Berat Donasi: {totalWeight} kg</h3> {/* Display the total weight */}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false, donationId: null })}
        >
          <DialogTitle>Hapus Donasi</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Apakah Anda yakin ingin menghapus donasi ini? Tindakan ini tidak dapat
              dibatalkan.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialog({ isOpen: false, donationId: null })}
            >
              Batal
            </Button>
            <Button
              color="error"
              onClick={() => handleDelete(confirmDialog.donationId)}
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DonationList;
