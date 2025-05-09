import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid2, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';


const add = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: [] as string[],
    imageUrl: "",
    rating: 0,
    ingredients: [] as string[],
    preparationTime: 0,
    cookingTime: 0,
    preservationMethods: [] as string[],
    relatedPosts: [] as string[],
  });

  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: SelectChangeEvent<string[]> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category" 
        ? (typeof value === "string" ? value.split(",") : value) // Ensure category is always an array
        : value, // Keep other fields as strings
    }));
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
    setMessage("Submitting...");
    if (!imageFile) {
      setMessage("Please select an image file.");
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

      if (!imageRes.ok) throw new Error("Image upload failed");

      const imageData = await imageRes.json();

      // After uploading, get the image URL and update formData
      const uploadedImageUrl = imageData?.imageUrl;


      const res = await fetch("/api/add", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          rating: formData.rating,
          imageUrl: uploadedImageUrl, // Just send 'uses' as a string
          preparationTime: formData.preparationTime,
          cookingTime: formData.cookingTime,
          preservationMethods: formData.preservationMethods,
          relatedPosts: formData.relatedPosts,
          ingredients: formData.ingredients,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
      const data = await res.json();


      console.log("API Response:", formData); // Debugging

      if (res.ok) {
        setMessage("Blog added successfully!");
        setOpenSnackbar(true);
        setFormData({ name: "", description: "", category: [], imageUrl: "", rating: 0, ingredients: [], preparationTime: 0, cookingTime: 0, preservationMethods: [], relatedPosts: [] });
        setImagePreview(null);
        setImageFile(null);
      } else {
        setMessage(data.message || "Error adding blog.");
        setOpenSnackbar(true);
      }


    } catch (error) {
      setMessage("Something went wrong.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 10, marginBottom: 10}}>
        <Typography variant="h5" gutterBottom>
          Lägg till en ny blogg
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, mt: 3 }}>
            <Grid2 >
              <TextField fullWidth label="Namn" name="name" value={formData.name} onChange={handleChange} required />
            </Grid2>
            <Grid2 >
              <TextField fullWidth multiline rows={3} label="Beskrivning" name="description" value={formData.description} onChange={handleChange} required />
            </Grid2>
            <Grid2 >
              <FormControl fullWidth required>
                <InputLabel>Kategori</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={(e) => handleChange(e as any)}
                  multiple // Allow multiple category selections
                  renderValue={(selected) => selected.join(", ")}
                >
                  {["Matlagning", "Svamptyper", "Konservering"].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      <Checkbox checked={formData.category.includes(cat)} />
                      <ListItemText primary={cat} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            {/* Conditional Fields Based on Category Selection */}
            {formData.category && formData.category.includes("Matlagning") && (
              <>
                <Grid2 >
                  <TextField fullWidth label="Ingredienser" name="ingredients"
                    value={formData.ingredients.join(", ")} // Convert array to string
                    onChange={(e) =>
                      setFormData({ ...formData, ingredients: e.target.value.split(", ") }) // Convert string back to array
                    }
                    required />
                </Grid2>
                <Grid2 >
                  <TextField fullWidth label="Förberedelseltid" name="preparationTime" value={formData.preparationTime} onChange={handleChange} required />
                </Grid2>
                <Grid2 >
                  <TextField fullWidth label="Tillagningstid" name="cookingTime" value={formData.cookingTime} onChange={handleChange} required />
                </Grid2>
                <Grid2 >
                  <TextField fullWidth label="Relaterade inlägg" name="relatedPosts" value={formData.relatedPosts.join(", ")} onChange={(e) =>
                      setFormData({ ...formData, relatedPosts: e.target.value.split(", ") })} />
                </Grid2>
              </>
            )}
            {formData.category && formData.category.includes("Svamptyper") && (
              <Grid2 >
                 <TextField fullWidth label="Relaterade inlägg" name="relatedPosts" value={formData.relatedPosts.join(", ")} onChange={(e) =>
                  setFormData({ ...formData, relatedPosts: e.target.value.split(", ") })} />
              </Grid2>
            )}
            {formData.category && formData.category.includes("Konservering") && (
              <>
                <Grid2 >
                  <TextField fullWidth label="Konserveringsmetoder" name="preservationMethods" value={formData.preservationMethods.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preservationMethods: e.target.value.split(", "),
                      })
                    } />
                </Grid2>
                <Grid2 >
                  <TextField fullWidth label="Relaterade inlägg" name="relatedPosts" value={formData.relatedPosts.join(", ")} onChange={(e) =>
                    setFormData({ ...formData, relatedPosts: e.target.value.split(", ") })} />
                </Grid2>
              </>
            )}

            {/* Rating Field */}
            <Grid2 >
              <TextField fullWidth label="Rating" name="rating" value={formData.rating} onChange={handleChange} required />
            </Grid2>
          
            {/* File Upload for Image */}
            <Grid2 >
              <Button variant="contained" component="label" fullWidth>
                Ladda upp bild
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
            </Grid2>

            {/* Image Preview */}
            {imagePreview && (
              <Grid2 >
                <Typography variant="body2">Preview:</Typography>
                <img src={imagePreview} alt="Preview" style={{
                  width: "100%", // Responsive width
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }} />
              </Grid2>
            )}

            <Grid2>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Lägg till blogg
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={message.includes("successfully") ? "success" : "error"}>{message}</Alert>
      </Snackbar>
    </Container>
  )
}

export default add
