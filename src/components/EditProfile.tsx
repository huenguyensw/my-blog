import { Alert, Avatar, Box, Button, Grid2, Snackbar, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface User {
    _id: string;
    userName: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
}

interface EditProfileProps {
    user: User;
    setUser: (user: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, setUser }) => {
    const [editFormData, setEditFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        userName: user?.userName || "",
        email: user?.email || "",
        imageUrl: user?.imageUrl || "",
        password: user?.password || "",
        newPassword: "",
        confirmPassword: ""
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    
    

    useEffect(() => {
        console.log("EditProfile user:", user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Updatering...");

        if (!editFormData.password) {
            console.log("Nuvarande lösenord krävs");
            setMessage("Nuvarande lösenord krävs");
            setOpenSnackbar(true);
            return;
        }

        if (editFormData.newPassword !== editFormData.confirmPassword) {
            console.log("Nya lösenordet matchar inte bekräftelsen");
            setMessage("Nya lösenordet matchar inte bekräftelsen");
            setOpenSnackbar(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('firstName', editFormData.firstName);
            formData.append('lastName', editFormData.lastName);
            formData.append('userName', editFormData.userName);
            formData.append('email', editFormData.email);
            formData.append('password', editFormData.newPassword ? editFormData.newPassword : editFormData.password);
            if (imageFile) {
                formData.append('imageUrl', imageFile);
            }
            console.log("image:", formData.get('imageUrl'));

            const response = await fetch(`/api/user/${user?._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Profil uppdaterad", data);
                setMessage("Profil uppdaterad");
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                // Redirect to profile or show success message
                // window.location.href = '/profile';
            } else {
                console.log("Något gick fel", data);
                setMessage(data.message || "Något gick fel");
            }
            setOpenSnackbar(true);
            
        } catch (error) {
            console.error("Fel vid uppdatering:", error);
            setMessage("Något gick fel");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} component="form" onSubmit={handleSubmit}>
            <Grid2 container spacing={3} sx={{ flexDirection: 'column', rowGap: 2, alignItems: 'flex-start', paddingLeft: 3 }}>
                <Grid2>
                    <h1>Redigera profil</h1>
                </Grid2>
            </Grid2>
            <Box sx={{
                padding: 3,
                flex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                columnGap: 12,
            }}>
                <Grid2 container spacing={3} sx={{ flexDirection: 'column', rowGap: 2, alignItems: 'flex-start' }}>
                    <Grid2><TextField fullWidth label="E-post" name="email" value={editFormData.email} required sx={{backgroundColor: '#f0f0f0'}} /></Grid2>
                    <Grid2><TextField fullWidth label="Förnamn" name="firstName" value={editFormData.firstName} onChange={handleChange} required /></Grid2>
                    <Grid2><TextField fullWidth label="Efternamn" name="lastName" value={editFormData.lastName} onChange={handleChange} required /></Grid2>
                    <Grid2><TextField fullWidth label="Användarnamn" name="userName" value={editFormData.userName} onChange={handleChange} required /></Grid2>
                </Grid2>
                <Grid2 container spacing={3} sx={{ flexDirection: 'column', rowGap: 2, alignItems: 'flex-start' }}>
                    <Grid2><TextField fullWidth label="Nuvarande Lösenord" name="password" type="password" value={editFormData.password} required sx={{backgroundColor: '#f0f0f0'}}/></Grid2>
                    <Grid2><TextField fullWidth label="Ny Lösenord" name="newPassword" type="password" value={editFormData.newPassword} onChange={handleChange} /></Grid2>
                    <Grid2><TextField fullWidth label="Bekräfta Nytt Lösenord" name="confirmPassword" type="password" value={editFormData.confirmPassword} onChange={handleChange} /></Grid2>
                </Grid2>
                <Grid2 container spacing={3} sx={{ flexDirection: 'column', marginLeft: 'auto', marginRight: 10}}>
                    <Avatar
                        alt={user?.firstName}
                        src={imagePreview || user?.imageUrl || ''}
                        sx={{ width: 250, height: 250, objectFit: 'cover' }}
                    />
                    <Button variant="text" component="label" fullWidth>
                        Ladda upp bild
                        <input type="file" hidden name="imageUrl" accept="image/*" onChange={handleFileChange} />
                    </Button>
                </Grid2>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 4, columnGap: 4, justifyContent: 'flex-end' }}>
                <Grid2>
                    <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ textTransform: 'none', fontSize: '1rem' }}>Spara</Button>
                </Grid2>
                <Grid2>
                    <Button type="button" variant="outlined" color="primary" fullWidth onClick={() => window.location.href = '/profile'} sx={{ textTransform: 'none', fontSize: '1rem' }}>Avbryt</Button>
                </Grid2>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={message.includes("uppdaterad") ? "success" : "error"}>{message}</Alert>  
            </Snackbar>
        </Box>
    );
};

export default EditProfile;
