import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import React from 'react'

const Subscribe = () => {
  return (
    <Container maxWidth='lg' sx={{   display: 'flex', flexDirection: 'column', alignItems: 'center',  backgroundImage: `url('/images/sub1.jpg')`,
                  backgroundSize: 'cover',
                  objectFit: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  position: 'relative',paddingTop: 4,paddingBottom: 4, marginTop: 8, rowGap: 1, borderRadius: 1, marginBottom: 8 }}>
    
      <h1 style={{ color: 'white', fontSize: '34px', fontWeight: '500', lineHeight: '0.3' }}>Prenumerera</h1>
      <Divider sx={{ width: '12%', backgroundColor: 'white', height: 2, fontWeight: '400' }} />
      <Typography sx={{ color: 'white', fontSize: '16px', fontFamily: 'Montserrat', mb: 4, fontWeight: '400' }}>Prenumerera på vårt nyhetsbrev och håll dig uppdaterad!</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
        <TextField 
          name="name"
          label="Din e-post"
          sx={{
            minWidth: '400px',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: 1.5,
              borderColor: 'white',
              fontWeight: '400'
            },
            '& .MuiOutlinedInput-root': {
              height: '3em', 
              color: 'white',
              alignItems: 'center',
              fontWeight: '400'
            },
            '& .MuiInputLabel-root': {
              color: 'white',
              fontWeight: '400'
            },
          }}
          required />
        <Button variant="contained" color='warning' sx={{ marginLeft: 1, padding: '1 2'  }}>
          Skicka
        </Button>
      </Box>
      {/* </Paper> */}
    </Container>
  )
}

export default Subscribe
