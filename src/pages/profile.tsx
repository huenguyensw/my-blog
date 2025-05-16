import EditProfile from '@/components/EditProfile'
import Header from '@/components/Header'
import { getServerSideProps } from './api/get';
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Footer from '@/components/Footer'
import { AuthContext } from '@/context/Auth'

type Blog = {
  _id: string;
  name: string;
  description: string;
  category: string[]
  imageUrl: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  preparationTime?: number;
  cookingTime?: number;
  preservationMethods?: string[];
  relatedPosts?: string[];
  ingredients?: string[];
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
  };
  cookingSteps?: string[];
  recognization?: string[];
}

type Props = {
  blogs: Blog[];
};

const Profile = ({ blogs }: Props) => {
  const [isPage, setIsPage] = React.useState(0);
  const { user, setUser } = React.useContext(AuthContext);

  const myBlogs = blogs.filter((blog) => blog.author?._id === user?._id);
  const myFavorites = blogs.filter((blog) => user?.favorites?.includes(blog._id));



  return (
    <Box sx={
      {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }
    } >
      <Header />
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 8,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          width: '50%',
          margin: '40px auto',
          columnGap: 4,
          backgroundColor: '#F0EBE3',
        }}
      >
        {/* Login Form Section - white background */}
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: 3,
            flex: 1,
            maxWidth: '15%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h5" gutterBottom
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.5rem',
              marginBottom: 2,
              marginTop: 2,
              color: '#0c2d72',
            }}>
            Min profil
          </Typography>

          <Button
            onClick={() => {
              setIsPage(0);
            }}
            sx={{
              textTransform: 'none',
              backgroundColor: isPage === 0 ? '#f1f5f5' : 'transparent',
            }}>
            <EditIcon sx={{ marginRight: 1 }} />
            <Typography variant="h5" gutterBottom
              sx={{
                fontFamily: 'Montserrat',
                fontSize: '1.2rem',
                color: '#0c2d72',
              }}>
              Redigera profil
            </Typography>
          </Button>
          <Button
            onClick={() => {
              setIsPage(1);
            }}
            sx={{
              textTransform: 'none',
              backgroundColor: isPage === 1 ? '#f1f5f5' : 'transparent',

            }}>
            <ArticleIcon sx={{ marginRight: 1 }} />
            <Typography variant="h5" gutterBottom
              sx={{
                fontFamily: 'Montserrat',
                fontSize: '1.2rem',
                color: '#0c2d72',
              }}>
              Mina inlägg
            </Typography>
          </Button>
          <Button
            onClick={() => {
              setIsPage(2);
            }}
            sx={{
              textTransform: 'none',
              backgroundColor: isPage === 2 ? '#f1f5f5' : 'transparent',
            }}>
            <FavoriteIcon sx={{ marginRight: 1 }} />
            <Typography variant="h5" gutterBottom
              sx={{
                fontFamily: 'Montserrat',
                fontSize: '1.2rem',
                color: '#0c2d72',
              }}>
              Mina favoriter
            </Typography>
          </Button>
          <Button onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/auth?isLoginPage=true'
          }}
            sx={{
              textTransform: 'none',
            }}>
            <Typography variant="h5" gutterBottom
              sx={{
                fontFamily: 'Montserrat',
                fontSize: '1.2rem',
                color: '#0c2d72',
              }}>
              Logga ut
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: 3,
            flex: 1,
            maxWidth: '85%',
          }}
        >
          {isPage === 0 && user && (
            <EditProfile user={user} setUser = {setUser} />
          )}
          {isPage === 1 && (
            <>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <h1>
                  Mina Inlägg
                </h1>
                <Button variant='outlined' color='primary' onClick={() => {
                  window.location.href = '/add'
                }}
                  sx={{ textTransform: 'none', fontSize: '1rem', fontFamily: 'Montserrat' }}>
                  Skapa nytt inlägg
                </Button>
              </Box>
              <Container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 2,
                  marginTop: 2,
                }}
              >
                {myBlogs.map((blog, index) => (
                  <Link 
                  key={index}
                  href={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        columnGap: 2,
                        backgroundColor: '#F0EBE3',
                        cursor: 'pointer',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400 }}>
                          {new Date(blog.createdAt).toLocaleDateString('sv-SE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 2 }}>
                        <img
                          src={blog.imageUrl}
                          alt={blog.name}
                          style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                        />

                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {blog.name}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {blog.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Link>

                ))}
              </Container>
              
            </>
          )}
          {isPage === 2 && (
            <> <h1>
              Mina favoriter
            </h1>
              <Container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 2,
                  marginTop: 2,
                }}
              >
                {myFavorites.map((blog, index) => (
                  <Link 
                  key={index}
                  href={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: 2,
                        backgroundColor: '#F0EBE3',
                        cursor: 'pointer',
                      }}

                    >
                      <img
                        src={blog.imageUrl}
                        alt={blog.name}
                        style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                      />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {blog.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {blog.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </Link>

                ))}
              </Container>
            </>
          )}

        </Box>
      </Paper>
      <Footer />
    </Box>
  )
}

export default Profile

export { getServerSideProps } 

