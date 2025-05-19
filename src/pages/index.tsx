import React, { useEffect, useMemo, useState } from 'react';
import Head from "next/head";
import { getServerSideProps } from './api/get';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid2, Paper, Typography, Rating, TablePagination, Avatar } from '@mui/material';
import Image from 'next/image';
import matImage from "../../public/images/Matsvampar.jpg"
import preservation from "../../public/images/done_canvas2.png"
import pickImage from "../../public/images/svampar.png"
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Subscribe from '@/components/Subscribe';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '@/context/Auth';



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
    setSelectedCategory(category); // Update state with clicked category
  };

  // Filter blogs based on the selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category.includes(selectedCategory))
    : blogs;


  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Memoize paginated data to prevent unnecessary recalculations
  const paginatedData = useMemo(() => {
    return filteredBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredBlogs, page, rowsPerPage]);

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

  console.log("Filtered Blogs:", filteredBlogs);

  const handleToggleFavorite = async (blogId: string) => {
    if (!user) return;

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
        <meta property="og:image" content="https://mushroom-blog-omega.vercel.app/images/wave2.png" />

        {/* Twitter Card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mushroom Blog | Discover, Learn, Share" />
        <meta name="twitter:description" content="Explore the world of mushrooms with insightful articles, tips, and stunning visuals. 🍄" />
        <meta name="twitter:image" content="https://mushroom-blog-omega.vercel.app/images/wave2.png" />
      </Head>
    <Box>
      <Header />
      <Paper elevation={0} sx={{ padding: 3, marginTop: 6, backgroundColor: '#F0EBE3', }}>
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5, display: 'flex', flexDirection: 'row', columnGap: 2, alignItems: 'center', justifyContent: 'space-around', rowGap: 3 }}>
          <Box sx={{
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            boxShadow: 2,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: 6,
            },
          }}
            onClick={() => handleCategoryClick("Matlagning")}>
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
            boxShadow: 2,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: 6,
            },
          }}
            onClick={() => handleCategoryClick("Svampar")}>
            <Image src={matImage} alt='matsvampart' width={180} height={260} style={{ display: 'block' }}
            />
          </Box>
          <Box sx={{
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
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
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {paginatedData.length <= 0 ?
          (<Typography gutterBottom align="left" color="primary" sx={{ mt: 10, fontFamily: 'Montserrat', fontSize: '30px', mb: 4, textAlign: 'center' }}>
            Ingen varor tillgänliga för den valda kategorin.
          </Typography>)
          : (<>
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
                          <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 'bold',  textTransform: 'uppercase' }}>{blog.category.join(",")}</Typography>
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
              count={filteredBlogs.length} // Total number of items
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
          </>)}
      </Container>
      <Subscribe />
      <Footer />
    </Box>
    </>

  )
}

export default Homepage

export { getServerSideProps };
