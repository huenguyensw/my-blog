import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Snackbar, Alert } from "@mui/material";

const add = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        uses: "",
        imageUrl: "",
    });

    const [message, setMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        setMessage("Submitting...");
        try{
            const  res = await fetch("/api/addMushrooms",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...formData, uses: formData.uses.split(',')}),
            })
            const data = await res.json();
            if (res.ok) {
                setMessage("Mushroom added successfully!");
                setOpenSnackbar(true);
                setFormData({ name: "", description: "", location: "", uses: "", imageUrl: "" });
              } else {
                setMessage(data.message || "Error adding mushroom.");
                setOpenSnackbar(true);
              }


        }catch(error) {
            setMessage("Something went wrong.");
            setOpenSnackbar(true);
        }
    };

  return (
    <Container maxWidth="sm">
    <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
      <Typography variant="h5" gutterBottom>
        Add a New Mushroom
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Description" name="description" value={formData.description} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Uses (comma-separated)" name="uses" value={formData.uses} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Mushroom
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>

    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
      <Alert severity={message.includes("successfully") ? "success" : "error"}>{message}</Alert>
    </Snackbar>
  </Container>
  )
}

export default add
