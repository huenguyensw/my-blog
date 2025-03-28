import React from 'react';
import { getServerSideProps } from './api/get';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid2, Paper, Typography, Rating } from '@mui/material';
import Image from 'next/image';
import svampImage from "../../public/images/launam.jpg"
import waveImage from "../../public/images/wave2.png"
import matImage from "../../public/images/Matsvampar.jpg"
import preservation from "../../public/images/done_canvas2.png"
import pickImage from "../../public/images/sv.png"
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'; // Replace Class with Category or any valid icon



type Blog = {
  _id: string;
  name: string;
  description: string;
  category: string[]
  imageUrl: string;
  rating?: number;
}

type Props = {
  blogs: Blog[];
};


const homepage = ({ blogs }: Props) => {

  return (
    <Box>
      <Button color='primary' href='#' sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontFamily: 'Montserrat' }}>Bli medlem</Button>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 0, backgroundColor: '#3277AA', }}>
        <Container maxWidth="lg" sx={{ mt: '0', display: 'flex', flexDirection: 'row', columnGap: 2, alignItems: 'center' }}>
          <Typography variant='body1' sx={{ color: 'white', fontSize: '30px', fontFamily: 'Montserrat' }}>
            Välkommen till Svampbloggen! Här kan du hitta en lista över svampar och deras användningsområden. Du kan också lägga till en ny svamp i listan genom att registrera ett medlemskap och bidra till bloggen.
          </Typography>
          <Image src={svampImage} alt="mushroom" />
        </Container>
      </Paper>
      <Image
        style={{
          position: 'absolute',
          top: '32.3%',
          left: 0,
        }}
        src={waveImage}
        alt="waveimage" />

      <Paper elevation={3} sx={{ padding: 3, marginTop: 6, backgroundColor: '#3277AA', }}>
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5, display: 'flex', flexDirection: 'row', columnGap: 2, alignItems: 'center', justifyContent: 'space-around', rowGap: 3 }}>
          <Image src={pickImage} alt='picksvampt' width={180} height={260} style={{ borderRadius: 2, cursor: 'pointer', transition: 'transform 0.3s ease-in-out', }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Enlarge on hover
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Restore size
          />
          <Image src={matImage} alt='matsvampart' width={180} height={260} style={{ borderRadius: 2, cursor: 'pointer', transition: 'transform 0.3s ease-in-out', }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Enlarge on hover
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Restore size
          />
          <Image src={preservation} alt='preservation' width={180} height={260} style={{ borderRadius: 2, cursor: 'pointer', transition: 'transform 0.3s ease-in-out', }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Enlarge on hover
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Restore size
          />
        </Container>
      </Paper>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {/* <Typography  gutterBottom align="left" color="primary" sx={{ mt: 10, fontFamily: 'Montserrat', fontSize: '30px', mb: 4}}>
          Lista över matsvampar i Sverige
        </Typography> */}
        <Grid2
          container
          spacing={4}
          justifyContent="center">
          {blogs.map((blog) => (
            <Grid2 key={blog._id}>
              <Card sx={{ height: '100%', backgroundColor: '#EAEBF1', width: '300px', display: 'flex', flexDirection: 'column', }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.imageUrl}
                  alt={blog.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent
                  sx={{ minHeight: '280px' }}>
                  <Rating name={`rating-${blog._id}`} value={blog.rating || 0} readOnly />
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
                      minHeight: '150px',
                      mb: 3
                    }}>
                    {blog.description}
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontSize: '20px', fontWeight: 700, cursor: 'pointer' }}>Reading more...</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, columnGap: 1 }}>
                    <CategoryOutlinedIcon />
                    <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 400 }}>{blog.category.join(",")}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  )
}

export default homepage

export { getServerSideProps };
