import React, { useMemo, useState } from 'react';
import { getServerSideProps } from './api/get';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid2, Paper, Typography, Rating, TextField, useScrollTrigger, InputAdornment, IconButton, TablePagination } from '@mui/material';
import Image from 'next/image';
import svampImage from "../../public/images/launam.jpg"
import waveImage from "../../public/images/wave2.png"
import matImage from "../../public/images/Matsvampar.jpg"
import preservation from "../../public/images/done_canvas2.png"
import pickImage from "../../public/images/svampar.png"
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'; // Replace Class with Category or any valid icon
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Filter } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Subscribe from '@/components/Subscribe';
import AuthProvider from '@/context/Auth';



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
  author?: string;
}

type Props = {
  blogs: Blog[];
};

type RatingType = {
  name: string;
  value: number;
}


const AnimatedRating = ({ name, value }: RatingType) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.0, // Duration for one full flicker cycle
      }}
    >
      <Rating name={name} value={value} readOnly />
    </motion.div>
  );
};

const homepage = ({ blogs }: Props) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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



  return (
    <AuthProvider>
      <Box>
        <Header />
        <Paper elevation={2} sx={{ padding: 3, marginTop: 6, backgroundColor: '#F0EBE3', }}>
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
              onClick={() => handleCategoryClick("Svamptyper")}>
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
                      onClick={() => handleCardClick(blog._id)}
                      sx={{
                        height: '100%',
                        backgroundColor: '#EAEBF1',
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '2px solid transparent',
                        // transition: 'border-color 0.3s ease-in-out  transform 0.2s ease-in-out',
                        cursor: 'pointer',
                        // '&:hover': {
                        //   transform: 'scale(1.02)', // Slight scale-up effect
                        // }
                      }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={blog.imageUrl}
                        alt={blog.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent
                        sx={{ minHeight: '280px' }}>
                        <AnimatedRating name={`rating-${blog._id}`} value={blog.rating || 0} />
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
                            height: '150px',
                            mb: 3,
                            textOverflow: 'ellipsis',
                            paddingBottom: 1,
                          }}>
                          {blog.description}
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>Reading more...</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, columnGap: 1 }}>
                          <CategoryOutlinedIcon />
                          <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400 }}>{blog.category.join(",")}</Typography>
                        </Box>
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
    </AuthProvider>

  )
}

export default homepage

export { getServerSideProps };
