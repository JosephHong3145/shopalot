import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// TODO:
// Send and retrieve data to database
// enclose mechanics in form and make onSubmit function

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { getAuth, signOut } from "firebase/auth";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { v4 as uuidv4 } from "uuid";

const ProfileForm = ({ db, storage, user, userData }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [imageURL, setImageURL] = React.useState("");
  const form = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      imageRef: userData?.imageRef ?? "",
      userDescription: userData?.userDescription ?? "",
      phone: userData?.phone ?? "",
      email: userData?.email ?? "",
      address: userData?.address ?? "",
      userEntity: userData?.userEntity ?? "Customer",
    },
  });

  const { handleSubmit, control, setError, errors, reset, watch } = form;
  const imageRef = watch("imageRef");
  React.useEffect(() => {
    if (imageRef) {
      getDownloadURL(ref(storage, imageRef)).then((url) => {
        setImageURL(url);
      });
    }
  });

  const editProfile = (event) => {
    setIsEditMode(true);
  };

  const saveProfile = () => {
    setIsEditMode(false);
  };

  const cancelSaveProfile = (event) => {
    reset();
    setIsEditMode(false);
  };

  const onSubmit = async (data) => {
    await setDoc(doc(db, "users", user.uid), data);
    saveProfile();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md">
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Controller
                name="imageRef"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Box>
                    <Box
                      component="img"
                      sx={{ width: 1, borderRadius: 2 }}
                      src={imageURL}
                    />
                    {isEditMode && (
                      <Box mt={2} display="flex" alignItems="center">
                        <input
                          accept="image/*"
                          hidden
                          id="raised-button-file"
                          multiple
                          type="file"
                          onChange={async (event) => {
                            const name = event.target.files[0].name;
                            const uuid = uuidv4();
                            const storageRef = ref(storage, uuid);
                            uploadBytes(
                              storageRef,
                              await event.target.files[0].arrayBuffer()
                            ).then(() => {
                              onChange(uuid);
                            });
                          }}
                        />
                        <label htmlFor="raised-button-file">
                          <Box mr={2}>
                            <Button
                              variant="contained"
                              component="span"
                              sx={{ width: 200, height: 50 }}
                            >
                              Choose Image
                            </Button>
                          </Box>
                        </label>
                      </Box>
                    )}
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={7}>
              <Paper variant="outlined" sx={{ height: 1 }}>
                <Box mt={1} mb={1} mr={1} ml={1}>
                  <Box mt={1} mb={1} display="flex" flexdirection="column">
                    <Typography variant="h4">
                      <b>{user.displayName}</b>
                    </Typography>
                  </Box>
                  <Box mt={1} mb={1} align="bottom">
                    <Controller
                      name="userEntity"
                      control={control}
                      rules={{
                        required: "Phone number required. ",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <FormControl>
                          <FormLabel id="UserType">User Type:</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="UserType"
                            name="changeUserType"
                            value={value}
                            onChange={(event) => onChange(event.target.value)}
                          >
                            <FormControlLabel
                              value="Vendor"
                              control={<Radio disabled={!isEditMode} />}
                              label="Vendor"
                            />
                            <FormControlLabel
                              value="Customer"
                              control={<Radio disabled={!isEditMode} />}
                              label="Customer"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </Box>
                  <Box mt={1} mb={1} display="flex" flexdirection="column">
                    <Controller
                      name="phone"
                      control={control}
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
                          disabled={!isEditMode}
                        />
                      )}
                    />
                  </Box>
                  <Box mt={1} mb={1} display="flex" flexdirection="column">
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email required.",
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
                          disabled={!isEditMode}
                        />
                      )}
                    />
                  </Box>
                  <Box mt={1} mb={1} display="flex" flexdirection="column">
                    <Controller
                      name="address"
                      control={control}
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
                          disabled={!isEditMode}
                        />
                      )}
                    />
                  </Box>
                  <Controller
                    name="userDescription"
                    control={control}
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
                        disabled={!isEditMode}
                      />
                    )}
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={2}>
              {isEditMode ? (
                <Box>
                  <Box display="flex" flexdirection="column">
                    <Button fullWidth type="submit" variant="contained">
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
      </Container>
    </form>
  );
};

export const MyProfileView = () => {
  const { firestore: db, storage } = useFirebase();
  const { user } = useAuthState();
  const [userData, loading] = useDocumentData(doc(db, "users", user.uid));
  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <ProfileForm
          db={db}
          storage={storage}
          user={user}
          userData={userData}
        />
      )}
    </Box>
  );
};
