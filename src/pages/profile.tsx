import { Box, Typography } from '@mui/material'
import React from 'react'

const profile = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography>Profile Page</Typography>
      <button onClick={() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login?isLoginPage=true'
      }}>Logout</button>
    </Box>
  )
}

export default profile
