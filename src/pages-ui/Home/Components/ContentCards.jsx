import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CardComponent = ({ title, content }) => {
    return (
        <Card sx={{ maxWidth: '320px', height: { sm: '355px', lg: '320px' }, margin: 'auto', boxShadow: '0px 24px 45.5px 0px rgba(0, 0, 0, 0.08)' }} >
            <CardContent>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', textAlign: 'center', height: '70px', width:'80%', margin: 'auto' }}>
                    {title}
                </Typography>
                <Typography variant="body1" component="p" sx={{ lineHeight: { sm: '24px', md: '25px' }, marginTop: '10px' }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};

const Cards = () => {
    return (
        <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <CardComponent
                    title="Our website is completely FREE!"
                    content="Maths Directory is NOT an agency, and we do NOT charge any commission or take a cut of the tutor's earnings. There are absolutely no hidden costs involved. Tutors can easily create a profile for free, while parents can also sign up for free and browse through the available tutors."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardComponent
                    title="The old fashion way!"
                    content="Parents you are in complete control – you hold the reins here. Contact tutors freely and without limitations. Feel empowered to reach out to as many as you need to find the perfect match for your child."
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <CardComponent
                    title="Find the right tutor for you!"
                    content="Our tutors each bringing a unique set of skills and teaching approaches. The ideal match may not necessarily be the most experienced or most qualified tutor, but someone you connect with, to make you feel comfortable to ensure effective learning."
                />
            </Grid>
        </Grid>
    );
};

export default Cards;
