// Footer section
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#5C9AC2', mt: 6 , mb: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#5C9AC2', gap: { xs: 1.5, sm: 2 } }}>
        <Typography variant='body1' sx={{ color: 'white', fontSize: { xs: '16px', sm: '18px', md: '20px' }, fontFamily: 'Montserrat', paddingRight: 2 }}>
          Kolla in Oss på Sociala Medier
        </Typography>
        <IconButton
          component="a"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Facebook sx={{ fontSize: 28, color: 'white' }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram sx={{ fontSize: 28, color: 'white' }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedIn sx={{ fontSize: 28, color: 'white' }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Twitter sx={{ fontSize: 28, color: 'white' }} />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default Footer
