/* eslint-disable prettier/prettier */
import {
  Box,

  Container,
  Grid,

  Typography,
} from "@mui/material";

import React from "react";
import map from './map2.png';
export const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Box mt={1} mb={1} mr={1} ml={1}>
        <Typography variant="h1">
          <b>About Us</b>
        </Typography>
        <Typography >
          <b>
            Shopalot is a website for buying and selling a variety of things
            while making a contribution to Concordia Universiy. Originally taught
            up as a school project with the name camelot, we now ship to people around the world. 
            This website is created and maintained by  Jeff Zhang , Alexandra Zana , Ali Alp Erdinc, 
            Eve Gagnon, Ru Joseph Hong , Abdelmalek Ihdene , Armita Zand and Ayman Mansoor.{" "}
          </b>
        </Typography>
      </Box>
      <Box mt={1} mb={1} mr={1} ml={1}>
      <Box mt={5} mb={5}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>

          <b>Map here</b>

          </Typography>
          <a href = "https://goo.gl/maps/MH4h6aPnuHDWuada6" >
          <img  src={map} alt="map" />
          </a>

          </Grid>
           <Grid item xs={6}>
             <Typography variant="h5">
               <b>To contact us</b>
               </Typography>
               <Typography >
               <b>Headquarters Adress : 1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8</b>
               </Typography>
               <Typography >
               <b>Telephone Number: +1 514 997 6488</b>
               </Typography>
               <Typography >
               <b>Email: Shopalot@gmail.com  </b>
               </Typography>
               </Grid>
               </Grid>
               </Box>
               <Typography >
               <b>If you have any questions, compaints or bug you want to tell us about please send them to our support email: SupportShopalot@gmail.com We hope youYou enjoyed your shopping experience. </b>
               </Typography>


      </Box>

    </Container>
  );
};

