import { Button, Container, Grid2,  Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const forgotpassword = () => {
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 10, marginBottom: 10, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Hjälp med lösenord
                </Typography>
                <Typography variant="body2">Ange e-postadressen som är kopplat till ditt konto.</Typography>
                <Grid2 container spacing={2} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, mt: 3 }}>
                <Typography gutterBottom sx={{ fontSize: 13, fontWeight: 'bold', mb: -1, mt: 1 }} >
                    E-post
                </Typography>
                <TextField type="email" name="email" required />
                <Button type="submit">Skicka</Button>
                </Grid2>
            </Paper>
        </Container>
    )
}

export default forgotpassword
