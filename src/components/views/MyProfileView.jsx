import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { getAuth, signOut } from "firebase/auth";
import React from "react";

import { useAuthState } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

export const MyProfileView = () => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const { user } = useAuthState();

  const placeholder = {
    imageURL:
      "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
    userName: user.displayName,
    userDescription:
      "The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding",
    reputation: 5,
    phone: "123-456-7890",
    email: "john.doe@gmail.com",
    location: "3145 Broadway blvd. ",
    userEntity: "user",
  };

  const editProfile = (event) => {
    // eslint-disable-next-line no-console
    console.log("Navigating to edit profile. ");
  };

  return (
    <Container maxWidth="xl">
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              component="img"
              sx={{ width: 1, borderRadius: 2 }}
              src={placeholder.imageURL}
            />
          </Grid>
          <Grid item xs={5}>
            <Paper variant="outlined" sx={{ height: 1 }}>
              <Box display="flex" flexdirection="column">
                <Typography variant="h4">
                  <b>{placeholder.userName}</b>
                </Typography>
              </Box>
              <Box align="bottom">
                <Typography variant="h6">
                  <b>{placeholder.userEntity}</b>
                </Typography>
              </Box>
              <Box display="flex" flexdirection="column">
                <Typography variant="h6">
                  <b>Phone: </b>
                </Typography>
                <Typography variant="h6">
                  <b>{placeholder.phone}</b>
                </Typography>
              </Box>
              <Box display="flex" flexdirection="column">
                <Typography variant="h6">
                  <b>Email: </b>
                </Typography>
                <Typography variant="h6">
                  <b>{placeholder.email}</b>
                </Typography>
              </Box>
              <Box display="flex" flexdirection="column">
                <Typography variant="h6">
                  <b>Address: </b>
                </Typography>
                <Typography variant="h6">
                  <b>{placeholder.location}</b>
                </Typography>
              </Box>
              <Box display="flex" flexdirection="column">
                <Typography variant="h6">
                  <b>Description: </b>
                </Typography>
              </Box>
              <Box display="flex" flexdirection="column">
                <Typography variant="body1">
                  <b>{placeholder.userDescription}</b>
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="contained" onClick={editProfile}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexdirection="column">
        <Grid item xs={2}>
          <Button fullWidth variant="contained" onClick={editProfile}>
            Add Item
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};
