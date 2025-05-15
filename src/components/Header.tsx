import { Avatar, Box, Container, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import waveImage from "../../public/images/wave2.png"
import svampImage from "../../public/images/launam.jpg"
import svampLogo from "../../public/images/svamp.png"
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/Auth';
import { useSearchParams } from 'next/navigation';



const Header = () => {

    const router = useRouter();
    const { token, user } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const isLoginPage = searchParams.get('isLoginPage') === 'true';

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };




    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#5C9AC2', marginTop: 0, padding: 0.8, paddingLeft: 1 }}>
                <Box
                    component="span"
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // animation: 'wiggle 1s ease-in-out infinite',
                        // '@keyframes wiggle': {
                        //     '0%': { transform: 'rotate(0deg)' },
                        //     '25%': { transform: 'rotate(8deg)' },
                        //     '50%': { transform: 'rotate(-8deg)' },
                        //     '75%': { transform: 'rotate(8deg)' },
                        //     '100%': { transform: 'rotate(0deg)' },
                        // },
                    }}
                    onClick={() => window.location.href = '/'}
                >
                    <Image
                        src={svampLogo}
                        alt="Svampens Värld"
                        width={85}
                        height={70}
                        style={{ marginRight: '8px', marginTop: '5px' }} // Adjust the margin as needed
                    />
                    <Typography sx={{ fontFamily: 'Pacifico', color: 'white', fontSize: 20 }}>Svampens Värld</Typography>
                </Box>
                <Typography sx={{fontFamily: 'Pacifico', color: 'white', fontSize: 40}}>Mushrooms Blog</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 4, alignItems: 'center' }}>
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
                                color: 'white', // Label color
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white', // Border color   
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
                        onClick={() => router.push("/auth?isLoginPage=true")} 
                        />
                    )}
                </Box>
            </Box>
            <Paper elevation={0} sx={{ padding: 3, marginTop: 0, backgroundColor: '#F0EBE3', position: 'relative', overflow: 'hidden' }}>
                <Container maxWidth="lg" sx={{ mt: '0', display: 'flex', flexDirection: 'row', columnGap: 2, alignItems: 'center' }}>
                    <Typography variant='body1' sx={{ color: '#0c2d72', fontSize: '28px', fontFamily: 'Montserrat' }}>
                        Välkommen till Svampbloggen! Här kan du hitta en lista över svampar och deras användningsområden. Du kan också lägga till en ny svamp i listan genom att registrera ett medlemskap och bidra till bloggen.
                    </Typography>
                    <Image src={svampImage} alt="mushroom" />
                </Container>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px' }}>
                    <Image
                        src={waveImage}
                        alt="waveimage"
                        fill
                        style={{
                            // objectFit: 'cover',
                            // objectPosition: 'bottom',
                            zIndex: 0,
                        }}
                    />
                </Box>
            </Paper>

        </Box>
    )
}

export default Header
