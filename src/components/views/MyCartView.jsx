import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Rating,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";

import { useCollection } from "react-firebase-hooks/firestore";

// const placeholder = {
//   imageURL:
//     "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
//   itemName: "Adidas Grand Court Sneakers",
//   price: "$53.00 CAD",
//   size: "12",
//   color: "White",
//   refundPolicy: "30 days refund",
//   orderProcessingDelay: 3,
// };

// const cartItem = {
//   items: [
//     {
//       id: "1",
//       name: "Adidas shoes",
//       image:
//         "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
//       status: "In Stock",
//       seller: "Nozama",
//       shipping: "2 days shipping",
//       price: "2.88",
//       quantity: "3",
//     },
//     {
//       id: "2",
//       name: "Jordan",
//       image:
//         "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
//       status: "Out of Stock",
//       seller: "Nozama",
//       shipping: "Premium",
//       price: "15.99",
//       quantity: "2",
//     },
//     {
//       id: "3",
//       name: "new name",
//       image:
//         "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
//       status: "Out of Stock",
//       seller: "Nozama",
//       shipping: "Premium",
//       price: "32.99",
//       quantity: "1",
//     },
//   ],
// };

export const ItemComponent = (props) => {
  const { item, i, db, storage } = props;
  const [imageURL, setImageURL] = React.useState("");
  React.useEffect(() => {
    getDownloadURL(ref(storage, item.imageRef)).then((url) => {
      setImageURL(url);
    });
  }, [item.imageRef, storage]);
  return (
    <Box>
      {i !== 0 && (
        <Box mt={1} mb={1}>
          <Divider />
        </Box>
      )}
      <Box display="flex">
        <Box mr={4}>
          {imageURL ? (
            <img
              className="photo"
              src={imageURL}
              width="220"
              height="220"
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
            <Typography variant="h5" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Seller: {item.seller}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Price: ${item.price}
            </Typography>
            {item.filters.map((filter) => (
              <Typography key={item.id + "-" + filter.name} gutterBottom>
                {filter.name + ": " + filter.value}
              </Typography>
            ))}
          </Box>
          <Box mb={1}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  size="small"
                  type="number"
                  label="Quantity"
                  InputProps={{ inputProps: { min: 1 } }}
                  value={item.quantity}
                  onChange={(event) => {
                    const newItem = { ...item };
                    delete newItem.id;
                    newItem.quantity = Number(event.target.value);
                    setDoc(doc(db, "cart", item.id), newItem);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={(event) => {
                    deleteDoc(doc(db, "cart", item.id));
                  }}
                >
                  Delete Item
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getItemsPrice = (items) => {
  return items
    .reduce(
      (partialSum, item) =>
        partialSum + Number(item.price) * Number(item.quantity),
      0
    )
    .toFixed(2);
};

export const MyCartView = () => {
  const { firestore: db, storage } = useFirebase();
  const { user } = useAuthState();
  const [value] = useCollection(
    query(collection(db, "cart"), where("userId", "==", user.uid))
  );
  const items =
    value?.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) ?? [];
  return (
    <Container size="md">
      {items ? (
        <Box mt={3}>
          <Typography variant="h3" gutterBottom component="div">
            Shopping Cart
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Box component={Paper} variant="outlined" padding={2}>
                {items.length > 0 ? (
                  items.map((item, i) => (
                    <ItemComponent
                      key={item.id}
                      item={item}
                      i={i}
                      db={db}
                      storage={storage}
                    />
                  ))
                ) : (
                  <Typography>No items are in the shopping card</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box component={Paper} variant="outlined" padding={2}>
                <Box mb={1}>
                  <Typography>
                    {"Subtotal (" +
                      items.length +
                      " items): $" +
                      getItemsPrice(items)}
                  </Typography>
                </Box>
                <Link to="/payment" style={{ textDecoration: "none" }}>
                  <Button type="button" variant="contained" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
