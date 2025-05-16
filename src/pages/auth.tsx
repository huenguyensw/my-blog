import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid2, Snackbar, Alert, Box, Link } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import Header from '@/components/Header';
import { AuthContext } from '@/context/Auth';
import Footer from '@/components/Footer';


const Auth = () => {
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    userName: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const { setToken, setUser } = useContext(AuthContext);


  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: SelectChangeEvent<string[]> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Generate a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Skickar...");
    if (!imageFile) {
      setMessage("Vänligen välj en bildfil.");
      setOpenSnackbar(true);
      return;
    };

    // Create a FormData object for the image upload
    const formDataImage = new FormData();
    formDataImage.append("file", imageFile);


    try {
      // Upload image to API (you need to implement this in /api/upload)
      const imageRes = await fetch("/api/upload", {
        method: "POST",
        body: formDataImage,
      });

      if (!imageRes.ok) throw new Error("Uppladdning av bilden misslyckades.");

      const imageData = await imageRes.json();

      // After uploading, get the image URL and update formData
      const uploadedImageUrl = imageData?.imageUrl;


      const res = await fetch("/api/register", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: registerFormData.firstName,
          lastName: registerFormData.lastName,
          email: registerFormData.email,
          userName: registerFormData.userName,
          imageUrl: uploadedImageUrl,
          password: registerFormData.password,
        }),
      })
      const data = await res.json();


      console.log("API Response:", registerFormData); // Debugging

      if (res.ok) {
        setMessage("Registreringen lyckades!");
        setOpenSnackbar(true);
        setRegisterFormData({ firstName: "", lastName: "", email: "", imageUrl: "", userName: "", password: "" });
        setImagePreview(null);
        setImageFile(null);
        // window.location.href = '/'; // Redirect to login page after successful registration
      } else {
        // Handle email already exists case
        if (res.status === 409 && data.message?.includes("Email")) {
          setMessage("Denna e-postadress är redan registrerad.");
        } else {
          setMessage(data.message || "Fel vid registrering.");
        }
        setOpenSnackbar(true);
      }


    } catch (error) {
      setMessage("Något gick fel.");
      setOpenSnackbar(true);
      console.error("Error during registration:", error);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpenSnackbar(false);
    setMessage('');
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();
      console.log("Login response:", response);
      console.log("Login data:", data);
      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        setMessage('Inloggning lyckades!');
        setOpenSnackbar(true);
        window.location.href = '/'; // Redirect to the home page or any other page
      } else {
        setMessage(data.message || 'Inloggning misslyckades!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setMessage('Något gick fel! Försök igen.');
      setOpenSnackbar(true);
      console.error('Error during login:', error);
    }
  };

  console.log("Message:", message); // Debugging


  return (
    <Box sx={
      {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }
    }>
      <Header/>
      <Container>
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            marginTop: 8,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#F0EBE3',
          }}
        >
          {/* Login Form Section - white background */}
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: 3,
              flex: 1,
              maxWidth: '50%',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Inloggning
            </Typography>

            <form onSubmit={handleLogin}>
              <Grid2 container spacing={2} sx={{ flexDirection: 'column', rowGap: 2, mt: 3 }}>
                <Grid2>
                  <TextField fullWidth label="E-post" name="email" value={loginFormData.email} onChange={handleLoginChange} required />
                </Grid2>
                <Link href="/forgot-password" variant="body2" sx={{ textAlign: 'right', mb: -1, mt: 1 }}>
                  Glömt lösenordet?
                </Link>
                <Grid2>
                  <TextField fullWidth label="Lösenord" name="password" type="password" value={loginFormData.password} onChange={handleLoginChange} required />
                </Grid2>
                <Grid2>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Logga in
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Box>

          {/* Register Form Section - gray background with left border */}
          <Box
            sx={{
              backgroundColor: '#f1f5f5',
              padding: 3,
              flex: 1,
              maxWidth: '50%',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Registrera dig
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={2} sx={{ flexDirection: 'column', rowGap: 2, mt: 3 }}>
                <Grid2>
                  <TextField fullWidth label="Förnamn" name="firstName" value={registerFormData.firstName} onChange={handleChange} required />
                </Grid2>
                <Grid2>
                  <TextField fullWidth label="Eftername" name="lastName" value={registerFormData.lastName} onChange={handleChange} required />
                </Grid2>
                <Grid2>
                  <TextField fullWidth label="E-post" name="email" value={registerFormData.email} onChange={handleChange} required />
                </Grid2>
                <Grid2>
                  <TextField fullWidth label="Användarnamn" name="userName" value={registerFormData.userName} onChange={handleChange} required />
                </Grid2>
                <Grid2>
                  <TextField fullWidth label="Lösenord" name="password" type="password" value={registerFormData.password} onChange={handleChange} required />
                </Grid2>
                <Grid2>
                    <input type="file" accept="image/*" onChange={handleFileChange} required />
                </Grid2>

                {imagePreview && (
                  <Grid2>
                    <Typography variant="body2">Preview:</Typography>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  </Grid2>
                )}

                <Grid2>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Skapa konto
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </Box>
        </Paper>

        <Snackbar open={openSnackbar} autoHideDuration={30000} onClose={() => setOpenSnackbar(false)}>
          <Alert severity={message.includes("lyckades") ? "success": "error"}>{message}</Alert>
        </Snackbar>
      </Container>
      <Footer/>
    </Box>

  )
}

export default Auth;
