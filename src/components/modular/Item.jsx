import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { getDownloadURL, ref } from "@firebase/storage";
import { useFirebase } from "../../contexts/FirebaseContext";

export default function Item(props) {
  const {
    id,
    itemName,
    imageRef,
    price,
    storage,
    seller,
    condition,
    category,
  } = props;
  const [imageURL, setImageURL] = React.useState("");
  React.useEffect(() => {
    console.log(imageRef);
    getDownloadURL(ref(storage, imageRef)).then((url) => {
      setImageURL(url);
    });
  }, [imageRef, storage]);
  return (
    <Box pt={3} mr={3}>
      <Card variant="outlined">
        {imageURL ? (
          <CardMedia
            component="img"
            height="200"
            image={imageURL}
            sx={{ objectFit: "contain", marginTop: 2 }}
          />
        ) : (
          <CardMedia height="200">
            <Box display="flex" alignItem="center" justifyContent="center">
              <CircularProgress />
            </Box>
          </CardMedia>
        )}
        <CardContent>
          <Link href={`/items/${id}`} underline="none">
            <Typography gutterBottom variant="h5" component="div">
              {itemName}
            </Typography>
          </Link>
          <Typography gutterBottom variant="h7" component="div">
            <b>{"Seller: "}</b>
            {seller}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            <b>{"Category: "}</b>
            {category}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            <b>{"Condition: "}</b>
            {condition}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
