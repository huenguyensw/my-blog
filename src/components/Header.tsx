import { Avatar, Box, Button, Container, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import waveImage from "../../public/images/wave2.png"
import svampImage from "../../public/images/launam.jpg"
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/Auth';
import { useSearchParams } from 'next/navigation';


const Header = () => {

    const router = useRouter();
    const { token, user } = useContext(AuthContext);
    console.log("Header token", token);
    console.log("Header user", user);
    const searchParams = useSearchParams();
    const isLoginPage = searchParams.get('isLoginPage') === 'true';

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    const mushroomEmoji = '🍄';



    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#5C9AC2', marginTop: 0, padding: 0.8, paddingLeft: 1 }}>
                <Box
                    component="span"
                    sx={{
                        fontSize: '3rem', // Increase size
                        cursor: 'pointer',
                        animation: 'wiggle 1s ease-in-out infinite',
                        '@keyframes wiggle': {
                            '0%': { transform: 'rotate(0deg)' },
                            '25%': { transform: 'rotate(8deg)' },
                            '50%': { transform: 'rotate(-8deg)' },
                            '75%': { transform: 'rotate(8deg)' },
                            '100%': { transform: 'rotate(0deg)' },
                        },
                    }}
                    onClick={() => window.location.href = '/'}
                >
                    {mushroomEmoji}
                </Box>
                <Typography sx={{fontFamily: 'Pacifico', color: 'white', fontSize: 40}}>Svampens Värld</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 4 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Sök svamp"
                        value={searchQuery} // Controlled input state
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            fontFamily: 'Montserrat',
                            paddingBottom: 0.5,
                            width: '350px',
                            border: 'none',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px', // Rounded corners
                                height: '2.5em', // Height of the input field
                                color: 'white', // Text color
                                // '&:hover fieldset': { border: 'none' }, // Hover effect
                                // '&.Mui-focused fieldset': { border: '#none' } // Focus effect
                            },
                            '& .MuiInputLabel-root': {
                                color: '#F0EBE3', // Label color
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#5C9AC2', // Border color   
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleSearch}>
                                        <SearchOutlinedIcon sx={{ color: '#F0EBE3' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {token? (
                        <Avatar 
                        alt="User"
                        src={`http://localhost:3000/${user?.imageUrl}`} 
                        sx={{ width: 56, height: 56, cursor: 'pointer' }}
                        onClick={() => router.push("/profile?isLoginPage=false")}
                      />
                    ) : ( 
                    !isLoginPage && 
                        <Avatar 
                        sx={{  width: 45, height: 45, cursor: 'pointer' }}
                        onClick={() => router.push("/register?isLoginPage=true")} 
                        />
                    )}
                </Box>
            </Box>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 0, backgroundColor: '#F0EBE3', }}>
                <Container maxWidth="lg" sx={{ mt: '0', display: 'flex', flexDirection: 'row', columnGap: 2, alignItems: 'center' }}>
                    <Typography variant='body1' sx={{ color: '#0c2d72', fontSize: '28px', fontFamily: 'Montserrat' }}>
                        Välkommen till Svampbloggen! Här kan du hitta en lista över svampar och deras användningsområden. Du kan också lägga till en ny svamp i listan genom att registrera ett medlemskap och bidra till bloggen.
                    </Typography>
                    <Image src={svampImage} alt="mushroom" />
                </Container>
            </Paper>
            <Image
                style={{
                    position: 'absolute',
                    top: '32.9%',
                    left: 0,
                }}
                src={waveImage}
                alt="waveimage" />
        </Box>
    )
}

export default Header
