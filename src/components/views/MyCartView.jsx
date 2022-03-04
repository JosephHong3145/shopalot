import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Link,
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
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";
// import styled from "@mui/material/styles";

const placeholder = {
  imageURL:
    "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
  itemName: "Adidas Grand Court Sneakers",
  price: "$53.00 CAD",
  size: "12",
  color: "White",
  refundPolicy: "30 days refund",
  orderProcessingDelay: 3,
};

const cartItem = {
  items: [
    {
      id: "1",
      name: "Adidas shoes",
      image:
        "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
      status: "In Stock",
      seller: "Nozama",
      shipping: "Free",
      price: "$32.99",
    },
    {
      id: "2",
      name: "Jordan",
      image:
        "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
      status: "Out of Stock",
      seller: "Nozama",
      shipping: "Premium",
      price: "$32.99",
    },
    {
      id: "3",
      name: "new name",
      image:
        "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
      status: "Out of Stock",
      seller: "Nozama",
      shipping: "Premium",
      price: "$32.99",
    },
  ],
};

// const itemStyle = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary
// }));

export const MyCartView = () => {
  return (
    <Container size="md">
      <Typography variant="h2" gutterBottom component="div">
        Shopping Cart
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box component={Paper} variant="outlined" padding={2}>
            {cartItem.items.map((item, i) => {
              return (
                <Box key={item.id}>
                  {i !== 0 && (
                    <Box mt={1} mb={1}>
                      <Divider />
                    </Box>
                  )}
                  <Box display="flex">
                    <Box mr={4}>
                      <img
                        className="photo"
                        src={item.image}
                        width="200"
                        height="200"
                      />
                    </Box>
                    <Box>
                      <Typography variant="h3" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Status: {item.status}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Seller: {item.seller}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Shipping Method: {item.shipping}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Price: {item.price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component={Paper} variant="outlined" padding={2}>
            {"Hello, World!"}
          </Box>
        </Grid>
      </Grid>
    </Container>

    /*

// <Grid
          //   container
          //   rowSpacing={1}
          //   columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          //   key={item.id}
          //   variant="outlined"
          //   xs={6}
          //   md={8}
          // >
          //   <Grid xs={6} md={4}>
          //     <img
          //       className="photo"
          //       src={item.image}
          //       width="200"
          //       height="200"
          //     />
          //   </Grid>
          //   <Grid xs={3} md={8}>
          //     <Paper variant="outlined">
          //       <Typography variant="h3" gutterBottom>
          //         {item.name}
          //       </Typography>
          //       <Typography variant="body1" gutterBottom>
          //         Status: {item.status}
          //       </Typography>
          //       <Typography variant="body1" gutterBottom>
          //         Seller: {item.seller}
          //       </Typography>
          //       <Typography variant="body1" gutterBottom>
          //         Shipping Method: {item.shipping}
          //       </Typography>
          //       <Typography variant="body1" gutterBottom>
          //         Price: {item.price}
          //       </Typography>
          //     </Paper>
          //   </Grid>
          // </Grid>
*/
    // <Box pt={1}>
    //   {cartItem.items.map((item) => {
    //     return (
    //       <Box mt={2} key={"item-" + item.id}>
    //         <Card sx={{ width: 1 }} variant="outlined">
    //           <CardHeader title={item.name} />
    //           <CardMedia
    //             component="img"
    //             sx={{ width: 500, borderRadius: 2 }}
    //             src={item.image}
    //           />
    //           <CardContent>
    //             <Typography variant="body2" color="text.secondary">
    //               <b>{"Status: " + item.status}</b>
    //               <b>{"Seller: " + item.seller}</b>
    //               <b>{"Shipping Method: " + item.shipping}</b>
    //               <b>{"Price: " + item.price}</b>
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </Box>
    //     );
    //   })}
    // </Box>
  );
};
