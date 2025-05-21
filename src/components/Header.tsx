import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
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
    const [loginPromptOpen, setLoginPromptOpen] = useState(false);


    const handleAddBlog = () => {
        if (!user) {
            setLoginPromptOpen(true);
            return;
        }
        window.location.href = '/add'
    }


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#5C9AC2',
                    position: 'relative',
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
                        flexWrap: 'wrap',
                        columnGap: 2,
                        rowGap: { xs: 1, sm: 0 },
                        alignItems: 'center',
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: { xs: 'center', sm: 'flex-end' },
                        mt: { xs: 1, sm: 0 },
                    }}>
                    {pathname !== '/add' && <Button variant='outlined' color='secondary' onClick={handleAddBlog}
                        sx={{ textTransform: 'none', fontSize: '1rem', fontFamily: 'Montserrat' }}>
                        Skapa nytt inlägg
                    </Button>}

                    {token ? (
                        <Avatar
                            alt="User"
                            src={user?.imageUrl}
                            sx={{
                                width: { xs: 54, sm: 56, md: 64 },
                                height: { xs: 54, sm: 56, md: 64 },
                                cursor: 'pointer',
                                position: { xs: 'absolute', sm: 'static'},
                                top: '10px',
                                right: '10px',
                                border: '2px solid #F0EBE3', 
                                backgroundColor: '#F0EBE3',
                                p: 0.2,            
                                boxShadow: 2,                         
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onClick={() => router.push("/profile?isLoginPage=false")}
                        />
                    ) : (
                        !isLoginPage &&
                        <Avatar
                            sx={{
                                width: 45,
                                height: 45, cursor: 'pointer',
                                position: { xs: 'absolute', sm: 'static'},
                                top: '10px',
                                right: '10px',
                                border: '2px solid #F0EBE3', 
                                backgroundColor: '#F0EBE3',
                                p: 0.2,            
                                boxShadow: 2,                         
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onClick={() => router.push("/auth?isLoginPage=true")}
                        />
                    )}
                </Box>
            </Box>
            {(pathname === '/profile' || pathname === '/add' || pathname ==='/auth' || pathname.includes('/blog'))
            ? <Paper elevation={0}
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
            <Dialog
                open={loginPromptOpen}
                onClose={() => setLoginPromptOpen(false)}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Black with 90% opacity
                    },
                }}
            >
                <DialogContent
                    sx={{
                        display: 'flex',
                        p: 2,
                        gap: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                    }}>
                   
                    <DialogTitle sx={{ fontFamily: 'Montserrat', fontSize: { xs: '26px', sm: '30px', md: '34px', lg: '40px' } }}>Logga in krävs</DialogTitle>
                    <DialogContentText sx={{ fontFamily: 'Montserrat', fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '24px' } }}>
                        Du måste vara inloggad för att kunna lägga till en. Vill du logga in eller registrera dig nu?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLoginPromptOpen(false)} color="secondary">
                        Avbryt
                    </Button>
                    <Button
                        onClick={() => {
                            setLoginPromptOpen(false);
                            window.location.href = '/auth?isLoginPage=true';
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Logga in
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    )
}

export default Header
