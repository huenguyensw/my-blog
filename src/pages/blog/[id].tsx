// get  blog details
import { Box, Button, CardMedia, Container, Divider, Grid2, Paper, Typography } from '@mui/material';
import { getServerSideProps } from '../api/blog/[id]';
import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Subscribe from '@/components/Subscribe';

type Blog = {
    _id: string;
    name: string;
    description: string;
    category: string[];
    imageUrl: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    preparationTime: number;
    cookingTime: number;
    preservationMethods: string[];
    relatedPosts: string[];
    ingredients: string[];
    author?: {
    _id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
    };
    recognization: string[];
    cookingSteps: string[];
};

type Props = {
    blog: Blog | null;
};



const BlogDetail = ({ blog }: Props) => {

    const formattedDate = dayjs(blog?.createdAt).format('YYYY-MM-DD');

    const pointingEmoji = '👉';


    if (!blog) return <Typography variant="h4">Blog not found</Typography>;
    console.log("Blog:", blog);

    return (
        <Box>
            <Header />
            <Container maxWidth="lg" >
                <Paper elevation={0} sx={{ borderRadius: 2, padding: 4, mt: 4 }}>
                    {/* <Box sx={{  backgroundColor: '#EAEBF1', borderRadius: 1 }}> */}
                    <Grid2 sx={{ flexDirection: 'column'}}>
                        <Grid2 sx={{ color: '#0c2d72', fontWeight: 700, fontSize: '45px' }}>
                            {blog.name}
                            <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize: '20px' }}>
                                Publicerat {formattedDate} av {blog.author?.firstName} {blog.author?.lastName}
                            </Typography>
                            {blog.category.map((cat, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#EAEBF1',
                                        color: '#0c2d72',
                                        fontFamily: 'Montserrat',
                                        fontWeight: 'bold',
                                        borderRadius: 2,
                                        mr: 1,
                                        mb: 4,
                                    }}>
                                    {cat}
                                </Button>
                            ))}

                            <CardMedia component="img" height="500" sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }} image={blog.imageUrl} alt={blog.name} />

                            {blog.category.includes('Matlagning') && 
                            <>
                                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, columnGap: 1 }}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1, fontSize: '20px' }}>
                                        <span style={{ color: '#F97300', fontWeight: '500' }}>Beredningstid </span>{blog.preparationTime} minuter  <span style={{ color: '#F97300', fontWeight: '500' }}>| </span>
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1, fontSize: '20px' }}>
                                        <span style={{ color: '#F97300', fontWeight: '500' }}>Tillagningstid </span>{blog.cookingTime} minuter
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, columnGap: 1, mb: 8 }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize: '20px' }}>
                                        {blog.description}
                                    </Typography>
                                </Box>
                            </>}


                            {blog.category.includes('Matlagning') &&
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, columnGap: 8, }}>
                                    <Box>
                                        <Typography variant="h1" sx={{ fontFamily: 'Montserrat', color: '#F97300', fontWeight: 'bold', mt: 1, fontSize: '20px', textTransform: 'uppercase', textAlign: 'center' }}>
                                            Ingredienser
                                        </Typography>
                                        <Divider sx={{ backgroundColor: '#F97300', height: 1, fontWeight: '400' }} />

                                        {blog?.ingredients?.length > 0 && <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize: '20px' }}>
                                            {blog.ingredients.map((ingredient, index) => (
                                                <ul key={index}>
                                                    <li>{ingredient}</li>
                                                </ul>
                                            ))}
                                        </Typography>}
                                    </Box>
                                    <Box>
                                        <Typography variant="h1" sx={{ fontFamily: 'Montserrat', color: '#F97300', fontWeight: 'bold', mt: 1, fontSize: '20px', textTransform: 'uppercase', textAlign: 'center' }}>
                                            Implementering
                                        </Typography>
                                        <Divider sx={{ backgroundColor: '#F97300', height: 1, fontWeight: '400' }} />

                                        <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 2, fontSize: '20px' }}>
                                            {blog.cookingSteps.map((step, index) => (
                                                <ul key={index}>
                                                    <li>{pointingEmoji} {step}</li>
                                                </ul>
                                            ))}
                                        </Typography>
                                    </Box>
                                </Box>}
                            {blog.category.includes('Konservering') &&
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', mt: 8, rowGap: 4, }}>
                                    <Box>
                                        <Typography variant="h1" sx={{ fontFamily: 'Montserrat', color: '#F97300', fontWeight: 'bold', mt: 1, fontSize: '20px', textTransform: 'uppercase', textAlign: 'left' }}>
                                            Beskrivning
                                        </Typography>
                                        <Divider sx={{ backgroundColor: '#F97300', height: 1, fontWeight: '400', width: '150px' }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 2, fontSize: '20px' }}>
                                            {blog.description}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h1" sx={{ fontFamily: 'Montserrat', color: '#F97300', fontWeight: 'bold', mt: 1, fontSize: '20px', textTransform: 'uppercase', textAlign: 'left' }}>
                                            Bevarande metoder
                                        </Typography>
                                        <Divider sx={{ backgroundColor: '#F97300', height: 1, fontWeight: '400', width: '250px' }} />
                                        {blog?.preservationMethods?.length > 0 && <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 2, fontSize: '20px' }}>
                                            {blog.preservationMethods.map((method, index) => (
                                                <ul key={index}>
                                                    <li>{method}</li>
                                                </ul>
                                            ))}
                                        </Typography>}
                                    </Box>
                                </Box>}
                            {blog.category.includes('Svampar') &&
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', mt: 8, rowGap: 4, }}>
                                    <Box>
                                        <Typography variant="h1" sx={{ fontFamily: 'Montserrat', color: '#F97300', fontWeight: 'bold', mt: 1, fontSize: '20px', textTransform: 'uppercase', textAlign: 'left' }}>
                                            Beskrivning
                                        </Typography>
                                        <Divider sx={{ backgroundColor: '#F97300', height: 1, fontWeight: '400', width: '150px' }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 2, fontSize: '20px' }}>
                                            {blog.description}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h1" sx={{ fontFamily: 'Montserrat', color: '#F97300', fontWeight: 'bold', mt: 1, fontSize: '20px', textTransform: 'uppercase', textAlign: 'left' }}>
                                            Kännetecken
                                        </Typography>
                                        <Divider sx={{ backgroundColor: '#F97300', height: 1, fontWeight: '400', width: '160px' }} />
                                        {blog?.recognization?.length > 0 && <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 2, fontSize: '20px' }}>
                                            {blog.recognization.map((reg, index) => (
                                                <ul key={index}>
                                                    <li>{reg}</li>
                                                </ul>
                                            ))}
                                        </Typography>}
                                    </Box>
                                </Box>}

                            <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 4, fontSize: '20px' }}>
                                Relaterade inlägg:
                            </Typography>
                            {blog?.relatedPosts?.length > 0 && (<Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize: '20px' }}>
                                {blog.relatedPosts.map((post, index) => (
                                    <Box key={index}>
                                        <Link href={post} target='_blank'>{post}</Link>
                                    </Box>
                                ))}
                            </Typography>)}
                        </Grid2>

                    </Grid2>
                </Paper>
            </Container>
            <Subscribe />
            <Footer />
        </Box>
    )
}

export default BlogDetail

export { getServerSideProps }
