import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { getAuth, signOut } from "firebase/auth";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { useAuthState } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

export const MyProfileView = () => {
  const { app } = useFirebase();
  const auth = getAuth(app);
  const { user } = useAuthState();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const { handleSubmit, control, setError } = useForm();

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
    setIsEditMode(true);

    // eslint-disable-next-line no-console
    console.log("Edit mode: " + isEditMode);
  };

  const saveProfile = (event) => {
    setIsEditMode(false);

    // eslint-disable-next-line no-console
    console.log("Edit mode: " + isEditMode);
  };

  const cancelSaveProfile = (event) => {
    setIsEditMode(false);

    // eslint-disable-next-line no-console
    console.log("Edit mode: " + isEditMode);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              component="img"
              sx={{ width: 1, borderRadius: 2 }}
              src={placeholder.imageURL}
            />
          </Grid>
          <Grid item xs={7}>
            <Paper variant="outlined" sx={{ height: 1 }}>
              <Box mt={1} mb={1} mr={1} ml={1}>
                <Box mt={1} mb={1} display="flex" flexdirection="column">
                  {isEditMode ? (
                    <Controller
                      name="userName"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "User name required. ",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Username"
                          variant="outlined"
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    <Typography variant="h4">
                      <b>{placeholder.userName}</b>
                    </Typography>
                  )}
                </Box>
                <Box mt={1} mb={1} align="bottom">
                  {isEditMode ? (
                    <FormControl>
                      <FormLabel id="UserType">User Type:</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="UserType"
                        name="changeUserType"
                      >
                        <FormControlLabel
                          value="User"
                          control={<Radio />}
                          label="User"
                        />
                        <FormControlLabel
                          value="Company"
                          control={<Radio />}
                          label="Company"
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <Typography variant="h6">
                      <b>{placeholder.userEntity}</b>
                    </Typography>
                  )}
                </Box>
                <Box mt={1} mb={1} display="flex" flexdirection="column">
                  {isEditMode ? (
                    <Controller
                      name="Phone number"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Phone number required. ",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Phone"
                          variant="outlined"
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    <Typography variant="h6">
                      <b>{placeholder.phone} </b>
                    </Typography>
                  )}
                </Box>
                <Box mt={1} mb={1} display="flex" flexdirection="column">
                  {isEditMode ? (
                    <Controller
                      name="Email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: " Email required. ",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    <Typography variant="h6">
                      <b>{placeholder.email} </b>
                    </Typography>
                  )}
                </Box>
                <Box mt={1} mb={1} display="flex" flexdirection="column">
                  {isEditMode ? (
                    <Controller
                      name="Address"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Address required. ",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          label="Address"
                          variant="outlined"
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    <Typography variant="h6">
                      <b>{placeholder.address} </b>
                    </Typography>
                  )}
                </Box>
                {isEditMode ? (
                  <Controller
                    name="User description"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "User description required. ",
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth
                        label="User description"
                        variant="outlined"
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        onChange={onChange}
                        multiline
                        maxRows={10}
                      />
                    )}
                  />
                ) : (
                  <Typography variant="body1">
                    <b>{placeholder.userDescription} </b>
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={2}>
            {isEditMode ? (
              <Box>
                <Box display="flex" flexdirection="column">
                  <Button fullWidth variant="contained" onClick={saveProfile}>
                    Save
                  </Button>
                </Box>
                <Box display="flex" flexdirection="column">
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={cancelSaveProfile}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Button fullWidth variant="contained" onClick={editProfile}>
                Edit
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexdirection="column">
        <Grid item xs={2}>
          {isEditMode ? (
            <Box></Box>
          ) : (
            <Button fullWidth variant="contained" onClick={editProfile}>
              Add Item
            </Button>
          )}
        </Grid>
      </Box>
    </Container>
  );
};
