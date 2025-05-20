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
import { usePathname } from 'next/navigation';



const Header = () => {

    const router = useRouter();
    const { token, user } = useContext(AuthContext);
    const searchParams = useSearchParams();
    const isLoginPage = searchParams.get('isLoginPage') === 'true';
    const pathname = usePathname(); 
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };




    return (
        <Box>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#5C9AC2',
                    // marginTop: 0,
                    padding: 1,
                    rowGap: { xs: 1, sm: 0 },
                }}>
                <Box
                    component="span"
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                       mb: { xs: 1, sm: 0 },
                    }}
                    onClick={() => window.location.href = '/'}
                >
                    <Image
                        src={svampLogo}
                        alt="Svampens Värld"
                        width={85}
                        height={70}
                        style={{ marginRight: '8px', marginTop: '5px' }} 
                    />
                    <Typography sx={{ fontFamily: 'Pacifico', color: 'white', fontSize: 20 }}>Svampens Värld</Typography>
                </Box>
                <Typography
                    sx={{
                        fontFamily: 'Pacifico',
                        color: 'white',
                        fontSize: { xs: 24, sm: 32, md: 40 },
                        textAlign: { xs: 'center', sm: 'left' },
                        mb: { xs: 1, sm: 0 },
                        display: { xs: 'none', sm: 'block' }
                    }}>
                    Mushrooms Blog
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', sm: 'row' },
                        columnGap: 2,
                        rowGap: { xs: 1, sm: 0 },
                        alignItems: 'center',
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: { xs: 'center', sm: 'flex-end' },
                         mt: { xs: 1, sm: 0 }, 
                    }}>
                    <TextField
                        variant="outlined"
                        placeholder="Sök svamp"
                        value={searchQuery} // Controlled input state
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            fontFamily: 'Montserrat',
                            paddingBottom: 0.5,
                             width: { xs: '70%', sm: '300px', md: '350px' },
                            // width: '350px',
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
                        src={user?.imageUrl} 
                        sx={{ 
                            width: { xs: 54, sm: 56, md: 64 }, 
                            height: { xs: 54, sm: 56, md: 64 }, 
                            cursor: 'pointer',
                        }}
                        onClick={() => router.push("/profile?isLoginPage=false")}
                      />
                    ) : ( 
                    !isLoginPage && 
                        <Avatar 
                            sx={{
                                width: 45,
                                height: 45, cursor: 'pointer'
                            }}
                            onClick={() => router.push("/auth?isLoginPage=true")}
                        />
                    )}
                </Box>
            </Box>
            {pathname === '/profile' ? <Paper elevation={0}
                sx={{
                    padding: 3,
                    marginTop: 0,
                    backgroundColor: '#F0EBE3',
                    position: 'relative',
                    overflow: 'hidden',
                    pb: '100px',
                    display: { xs: 'none', sm: 'block' }
                }}>
                <Container maxWidth="lg"
                    sx={{
                        mt: '0',
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                        gap: 2,
                        alignItems: 'center'
                    }}>
                    <Typography variant='body1'
                        sx={{
                            color: '#0c2d72',
                            fontSize: { xs: '18px', sm: '22px', md: '28px' },
                            fontFamily: 'Montserrat',
                            textAlign: { xs: 'center', sm: 'left' },
                        }}>
                        Välkommen till Svampbloggen! Här kan du hitta en lista över svampar och deras användningsområden. Du kan också lägga till en ny svamp i listan genom att registrera ett medlemskap och bidra till bloggen.
                    </Typography>
                    <Image
                        src={svampImage}
                        alt="mushroom"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
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
                : <Paper elevation={0}
                    sx={{
                        padding: 3,
                        marginTop: 0,
                        backgroundColor: '#F0EBE3',
                        position: 'relative',
                        overflow: 'hidden',
                        pb: '100px',
                    }}>
                    <Container maxWidth="lg"
                        sx={{
                            mt: '0',
                            display: 'flex',
                            flexDirection: { xs: 'column-reverse', sm: 'row' },
                            gap: 2,
                            alignItems: 'center'
                        }}>
                        <Typography variant='body1'
                            sx={{
                                color: '#0c2d72',
                                fontSize: { xs: '18px', sm: '22px', md: '28px' },
                                fontFamily: 'Montserrat',
                                textAlign: { xs: 'center', sm: 'left' },
                            }}>
                            Välkommen till Svampbloggen! Här kan du hitta en lista över svampar och deras användningsområden. Du kan också lägga till en ny svamp i listan genom att registrera ett medlemskap och bidra till bloggen.
                        </Typography>
                        <Image
                            src={svampImage}
                            alt="mushroom"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
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
                </Paper>} 


        </Box>
    )
}

export default Header
