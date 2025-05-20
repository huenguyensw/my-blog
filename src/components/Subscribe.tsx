import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import React from 'react'

const Subscribe = () => {
  return (
    <Container maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: { xs: 1, sm: 0 },
        alignItems: 'center',
        backgroundImage: `url('/images/sub1.jpg')`,
        backgroundSize: 'cover',
        objectFit: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        position: 'relative',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        mt: 8,
        mb: 8,
        borderRadius: 1,
        textAlign: 'center',
      }}>

      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 500,
          fontSize: { xs: '24px', sm: '32px' },
          mb: 1,
        }}
      >
        Prenumerera
      </Typography>
      <Divider
        sx={{
          width: '60px',
          backgroundColor: 'white',
          height: '2px',
          mb: 2,
        }} />
      <Typography sx={{
        color: 'white',
        fontSize: { xs: '14px', sm: '16px' },
        fontFamily: 'Montserrat',
        mb: 3,
        fontWeight: 400,
        maxWidth: '600px',
      }}>Prenumerera på vårt nyhetsbrev och håll dig uppdaterad!</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        columnGap: 2,
        width: '100%',
        maxWidth: '500px',
      }}>
        <TextField
          fullWidth
          name="name"
          label="Din e-post"
          variant="outlined"
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              borderRadius: 2,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
          required />
        <Button variant="contained" color='warning'
          sx={{
            whiteSpace: 'nowrap',
            px: 4,
            py: 1.2,
            mt: { xs: 2, sm: 0 },
          }}>
          Skicka
        </Button>
      </Box>
      {/* </Paper> */}
    </Container>
  )
}

export default Subscribe
