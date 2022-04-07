import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../../../../contexts/AuthContext";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../../../contexts/FirebaseContext";
import React from "react";

export function CartItem({ item }) {
  const { storage } = useFirebase();
  const [imageURL, setImageURL] = React.useState("");
  React.useEffect(() => {
    getDownloadURL(ref(storage, item.imageRef)).then((url) => {
      setImageURL(url);
    });
  }, [item.imageRef, storage]);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box mr={4}>
          {imageURL ? (
            <img
              className="photo"
              src={imageURL}
              width="110"
              height="110"
              style={{
                objectFit: "contain",
              }}
            />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ width: 220, height: 220 }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="body1" gutterBottom align="left">
              {item.name}
            </Typography>
            <Typography variant="body2" gutterBottom align="left">
              Seller: {item.seller}
            </Typography>
            <Typography variant="body2" gutterBottom align="left">
              Price: ${item.price}
            </Typography>
            <Typography variant="body2" gutterBottom align="left">
              Item Processing Time: {item.itemProcessingDelay} days
            </Typography>
            {item.filters.map((filter) => (
              <Typography
                key={item.id + "-" + filter.name}
                variant="body2"
                align="left"
                gutterBottom
              >
                {filter.name + ": " + filter.value}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <Box mt={3} mb={3}>
        <Divider />
      </Box>
    </Box>
  );
}
