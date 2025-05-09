// get  blog details
import { Box, Card, CardContent, CardMedia, Container, Paper, Rating, Typography } from '@mui/material';
import { getServerSideProps } from '../api/blog/[id]';
import { useRouter } from 'next/router';
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
};

type Props = {
    blog: Blog | null;
};



const BlogDetail = ({ blog }: Props) => {
    const router = useRouter();

    const formattedDate = dayjs(blog?.createdAt).format('YYYY-MM-DD');

    const pointingEmoji = '👉';
    

    if (!blog) return <Typography variant="h4">Blog not found</Typography>;

    return (
        <Box>
            <Header />
            <Container maxWidth="lg" sx={{borderRadius: 1}} >
                {/* <Paper elevation={3} sx={{ padding: 0, margin: 0, }}> */}
                    <Box sx={{ mt: 0, backgroundColor: '#EAEBF1', borderRadius: 1 }}>
                        <CardMedia component="img" height="500" sx={{borderTopLeftRadius: 2, borderTopRightRadius: 2}} image={blog.imageUrl} alt={blog.name} />
                        <CardContent>
                            <Typography variant="h4" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 700 }}>
                                {blog.name}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 0, mb: 2, fontSize:'24px' }}>
                                Publicerat {formattedDate}
                            </Typography>
                            {/* <Rating name="read-only" value={blog.rating || 0} readOnly sx={{ mb: 2, mt: 2 }} /> */}
                            <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1, fontSize:'24px'  }}>
                                Relaterade inlägg:
                            </Typography>
                            {blog?.relatedPosts?.length > 0 && (<Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize:'24px'  }}>
                                {blog.relatedPosts.map((post, index) => (
                                    <ul key={index}>
                                        <li>{pointingEmoji} <Link href={post} target='_blank'>{post}</Link></li>
                                    </ul>
                                ))}
                        </Typography>)}
                        {blog.category.includes('Matlagning') &&
                            <>
                                <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1, fontSize: '24px' }}>
                                    Ingredienser:
                                </Typography>
                                {blog?.ingredients?.length > 0 && <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize: '24px' }}>
                                    {blog.ingredients.map((ingredient, index) => (
                                        <ul key={index}>
                                            <li>{ingredient}</li>
                                        </ul>
                                    ))}
                                </Typography>}
                            
                            <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1, fontSize:'24px'  }}>
                                Beredningstid:
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 0.2 , fontSize:'24px' }}>
                                <ul><li>{blog.preparationTime} timmar</li></ul>
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1, fontSize:'24px'  }}>
                                Tillagningstid:
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, fontSize:'24px'  }}>
                                <ul><li>{blog.cookingTime} timmar</li></ul>
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 1 , fontSize:'24px' }}>
                                Implementeringssteg:
                            </Typography>
                            </>}
                            <Typography variant="body2" sx={{ fontFamily: 'Montserrat', color: '#0c2d72', fontWeight: 500, mt: 0.2, fontSize:'24px'  }}>
                                <ul>
                                    <li>{blog.description}</li>
                                </ul>
                            </Typography>
                            
                            <Box sx={{ mt: 8 }}>
                                <Typography onClick={() => router.back()} sx={{ cursor: 'pointer', color: '#3277AA', fontFamily: 'Montserrat', fontWeight: 500, fontSize:'24px'  }}>
                                    ← Back to blogs
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                {/* </Paper> */}
            </Container>
            <Subscribe/>
            <Footer/>
        </Box>
    )
}

export default BlogDetail

export { getServerSideProps }
