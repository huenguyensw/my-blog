import { Height } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Subscribe = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F0EBE3', paddingTop: 4,paddingBottom: 4, marginTop: 8, rowGap: 4, borderRadius: 1 }}>
      <Typography sx={{ color: '#0c2d72', fontSize: '24px', fontFamily: 'Montserrat' }}>Prenumerera på vårt nyhetsbrev och håll dig uppdaterad!</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
        <TextField 
          name="name"
          label="Din e-post"
          sx={{
            minWidth: '600px',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: 1.5,
              borderColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
              height: '3em', 
              color: '#0c2d72',
              alignItems: 'center',
            },
            '& .MuiInputLabel-root': {
              color: '#0c2d72',
            },
          }}
          required />
        <Button variant="contained" color="primary" sx={{ marginLeft: 1 }}>
          Skicka
        </Button>
      </Box>
    </Box>
  )
}

export default Subscribe
