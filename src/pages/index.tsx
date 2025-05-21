import React, { useEffect, useMemo, useState } from 'react';
import Head from "next/head";
import { getServerSideProps } from './api/get';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid2, Paper, Typography, Rating, TablePagination, Avatar, Dialog, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment, IconButton, MenuItem } from '@mui/material';
import Image from 'next/image';
import matImage from "../../public/images/Matsvampar.jpg"
import favoriteImage from '../../public/images/favorite.png'
import preservation from "../../public/images/done_canvas2.png"
import pickImage from "../../public/images/svampar.png"
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Subscribe from '@/components/Subscribe';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '@/context/Auth';
import { SearchOutlined } from '@mui/icons-material';



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




const Homepage = ({ blogs }: Props) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, setUser } = React.useContext(AuthContext);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredData, setFilteredData] = useState<Blog[]>([]);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const filtered = blogs.filter((blog) => {
      const matchesSearch = blog.name.toLowerCase().includes(trimmedQuery) ||
        blog.description.toLowerCase().includes(trimmedQuery);
      const matchesCategory = selectedCategory
        ? blog.category.includes(selectedCategory)
        : true;
      const matchesFilter = selectedFilter === 'all'
        ? true
        : blog.category.map(c => c.toLowerCase()).includes(selectedFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesFilter;
    });
    console.log('selected category',selectedCategory)

    setFilteredData(filtered);
    setPage(0);

  }, [searchQuery, selectedCategory, selectedFilter, blogs]);

  useEffect(() => {
    setFilteredData(blogs);
  }, [blogs]);

  // Sync favorites when user changes
  useEffect(() => {
    if (user?.favorites) {
      setFavorites(user.favorites);
    }
  }, [user]);

  console.log("User:", user);
  console.log("Favorites:", favorites);


  // Handle Category Click
  const handleCategoryClick = (category: string) => {
    if(selectedCategory && selectedCategory === category){
      setSelectedCategory(null);
      return ;
    }
    setSelectedCategory(category); // Update state with clicked category
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Memoize paginated data to prevent unnecessary recalculations
  const paginatedData = useMemo(() => {
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleCardClick = (id: string) => {
    router.push(`/blog/${id}`); // Redirect to the blog details page
  }


  const handleToggleFavorite = async (blogId: string) => {
    if (!user) {
      setLoginPromptOpen(true);
      return;
    };

    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, blogId }),
      });

      if (res.ok) {
        const data = await res.json();

        const updatedUser = { ...user, favorites: data.favorites };
        setUser(updatedUser);
        setFavorites(data.favorites);
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };




  return (
    <>
      <Head>
        <title>Mushroom Blog | Discover, Learn, Share</title>
        <meta name="description" content="Explore the world of mushrooms with insightful articles, tips, and stunning visuals. 🍄" />

        {/* Open Graph tags for LinkedIn preview */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mushroom-blog-omega.vercel.app/" />
        <meta property="og:title" content="Mushroom Blog | Discover, Learn, Share" />
        <meta property="og:description" content="Explore the world of mushrooms with insightful articles, tips, and stunning visuals. 🍄" />
        <meta property="og:image" content="https://mushroom-blog-omega.vercel.app/images/background.png" />

        {/* Twitter Card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mushroom Blog | Discover, Learn, Share" />
        <meta name="twitter:description" content="Explore the world of mushrooms with insightful articles, tips, and stunning visuals. 🍄" />
        <meta name="twitter:image" content="https://mushroom-blog-omega.vercel.app/images/background.png" />
      </Head>
      <Box>
        <Header />
        <Paper elevation={0} sx={{ padding: 3, marginTop: 6, backgroundColor: '#F0EBE3', }}>
          <Container maxWidth="lg"
            sx={{
              mt: 5, mb: 5,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: 'wrap',
              columnGap: 8,
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 3
            }}>
            <Box sx={{
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              border: selectedCategory === 'Svampar' ? '2px solid #F0EBE3' : 'none',
              boxShadow: 2,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 6,
              },
            }}
              onClick={() => handleCategoryClick("Svampar")}>
              <Image src={pickImage} alt='picksvampt' width={180} height={260} style={{ display: 'block' }}
              // onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Enlarge on hover
              // onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Restore size
              />
            </Box>
            <Box sx={{
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              border: selectedCategory === 'Matlagning' ? '2px solid #F0EBE3' : 'none',
              boxShadow: 2,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 6,
              },
            }}
              onClick={() => handleCategoryClick("Matlagning")}>
              <Image src={matImage} alt='matsvampart' width={180} height={260} style={{ display: 'block' }}
              />
            </Box>
            <Box sx={{
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              border: selectedCategory === 'Konservering' ? '2px solid #F0EBE3' : 'none',
              boxShadow: 2,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 6,
              },
            }}
              onClick={() => handleCategoryClick("Konservering")}>
              <Image src={preservation} alt='preservation' width={180} height={260} style={{ display: 'block' }}
              />
            </Box>
          </Container>
        </Paper>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // fixed typo (was `sx`)
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
          mb: 2,
        }}>
          <TextField
            variant="outlined"
            placeholder="Sök svamp"
            value={searchQuery} // Controlled input state
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: '90%', sm: '300px', md: '350px' },
              backgroundColor: '#ffffff',
              borderRadius: 4,
              '& .MuiOutlinedInput-root': {
                color: '#0c2d72',
                fontFamily: 'Montserrat',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#5C9AC2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5C9AC2',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchOutlined sx={{ color: '#F0EBE3' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Filter Dropdown */}
          <TextField
            select
            label="Filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            sx={{
              width: { xs: '90%', sm: '200px' },
              backgroundColor: '#ffffff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                fontFamily: 'Montserrat',
                color: '#0c2d72',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#5C9AC2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5C9AC2',
                },
              },
            }}
          >
            <MenuItem value="all">Alla</MenuItem>
            {/* <MenuItem value="ätlig">Ätlig</MenuItem>
            <MenuItem value="giftig">Giftig</MenuItem>
            <MenuItem value="medicinsk">Medicinsk</MenuItem> */}
            {/* Add more filter categories as needed */}
          </TextField>
        </Box>

        <Container maxWidth="lg"
          sx={{
            mt: 5,
            mb: 5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            rowGap: 3,
            columnGap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          
            
          {paginatedData.length <= 0 ?
            (<Typography gutterBottom align="left" color="primary" sx={{ mt: 10, fontFamily: 'Montserrat', fontSize: '30px', mb: 4, textAlign: 'center' }}>
              Ingen varor tillgänliga för den valda kategorin.
            </Typography>)
            : (<Box>
              <Grid2
                container
                spacing={4}
                justifyContent="center">
                {paginatedData.map((blog) => (
                  <Grid2 key={blog._id}>
                    <Card
                      sx={{
                        height: '100%',
                        // backgroundColor: '#EAEBF1',
                        width: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        // transition: 'border-color 0.3s ease-in-out  transform 0.2s ease-in-out',
                        cursor: 'pointer',
                        // '&:hover': {
                        //   transform: 'scale(1.02)', // Slight scale-up effect
                        // }
                      }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={blog.imageUrl}
                          alt={blog.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '50%',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleToggleFavorite(blog._id)}
                        >
                          {favorites?.includes(blog._id) ? (
                            <FavoriteIcon sx={{ color: '#EB3678' }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ color: '#EB3678' }} />
                          )}

                        </Box>
                      </Box>
                      <CardContent onClick={() => handleCardClick(blog._id)}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400 }}>
                            {new Date(blog.createdAt).toLocaleDateString('sv-SE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                          <Button variant="outlined" color="primary" size="small" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400, borderColor: '#0c2d72', '&:hover': { backgroundColor: '#0c2d72', color: 'white' } }} onClick={(e) => { e.stopPropagation(); handleCategoryClick(blog.category[0]) }}>
                            <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 'bold', textTransform: 'uppercase' }}>{blog.category.join(",")}</Typography>
                          </Button>
                        </Box>
                        <Rating size="small" name={`rating-${blog._id}`} value={blog.rating || 0} readOnly />
                        <Typography
                          sx={{
                            fontFamily: 'Montserrat',
                            color: '#0c2d72',
                            fontSize: '24px',
                            fontWeight: 700,
                            height: '68px', // Ensures space for two lines
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2, // Limits to 2 lines
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            paddingBottom: 1,
                            mb: 0
                          }}>
                          {blog.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"
                          sx={{
                            fontFamily: 'Montserrat',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 5, // Limit to 5 lines
                            overflow: 'hidden',
                            height: '50px',
                            mb: 3,
                            textOverflow: 'ellipsis',
                            paddingBottom: 1,
                          }}>
                          {blog.description}
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>Reading more...</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, columnGap: 1 }}>
                          <Avatar
                            alt={blog.author?.firstName}
                            src={blog.author?.imageUrl}
                            sx={{ width: 24, height: 24, marginRight: 1 }}
                          />
                          <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400 }}>{blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : null}</Typography>
                        </Box>
                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, columnGap: 1 }}>
                        <CategoryOutlinedIcon />
                        <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400 }}>{blog.category.join(",")}</Typography>
                      </Box> */}
                      </CardContent>

                    </Card>
                  </Grid2>
                ))}
              </Grid2>
                <TablePagination
                  component="div"
                  count={filteredData.length} // Total number of items
                  page={page} // Current page
                  onPageChange={handleChangePage} // Function to handle page change
                  rowsPerPage={rowsPerPage} // Rows per page
                  onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
                  rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
                  sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center pagination
                    alignItems: 'center', // Align items vertically
                    marginTop: 2,
                    color: '#0c2d72',
                    '.MuiTablePagination-toolbar': {
                      width: '100%', // Ensure full width
                      justifyContent: 'center', // Center content inside
                    },
                    '.MuiTablePagination-actions': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '.MuiTablePagination-actions .MuiIconButton-root': {
                      outline: 'none', // Remove focus outline
                      boxShadow: 'none', // Remove box-shadow on focus
                      '&:focus': {
                        outline: 'none', // Ensure no outline when focused
                        boxShadow: 'none', // Ensure no box-shadow on focus
                      },
                    },
                    '.MuiTablePagination-selectLabel': {
                      fontFamily: 'Montserrat',
                    },
                  }}
                />
            </Box>)}
        </Container>
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
            <Box
              sx={{
                width: { xs: 120, md: 150 },
                height: { xs: 120, md: 150 },
                position: 'relative',
                mx: 'auto' // Center horizontally
              }}
            >
              <Image
                src={favoriteImage}
                alt="favoriteLogo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            {/* <DialogTitle sx={{ fontFamily: 'Montserrat', fontSize: { xs: '28px', sm: '32px', md: '36px', lg: '45px' } }}>Logga in krävs</DialogTitle> */}
            <DialogContentText sx={{ fontFamily: 'Montserrat', fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '24px' } }}>
              Du måste vara inloggad för att kunna spara favoriter. Vill du logga in eller registrera dig nu?
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

        <Subscribe />
        <Footer />
      </Box>
    </>

  )
}

export default Homepage

export { getServerSideProps };
