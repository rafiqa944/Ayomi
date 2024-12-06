import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebaseConfig';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DataUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null); // state for editing user
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, userId: null });

    useEffect(() => {
        // Function to fetch users from Firestore
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // Fetching all users from the 'users' collection
                const querySnapshot = await getDocs(collection(db, "user"));
                const usersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(), // Spread the document data
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

    const handleEdit = (user) => setEditingUser(user);

    const handleSave = async (updatedUser) => {
        try {
            // Update the user data in Firestore (this example doesn't implement the update function)
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            setEditingUser(null);
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID' },
            { accessorKey: 'nama', header: 'Nama' },
            { accessorKey: 'email', header: 'Email' },
            { accessorKey: 'kontak', header: 'Kontak' },
            { accessorKey: 'alamat', header: 'Alamat' },
            { accessorKey: 'username', header: 'Username' },
        ],
        []
    );

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <span className="text-lg font-bold pt-2">Data User</span>
            </div>
            <MaterialReactTable
                columns={columns}
                data={users}
                enableEditing
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(row.original)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => setConfirmDialog({ isOpen: true, userId: row.original.id })}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </div>
    );
};

export default DataUser;
