import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

import React from "react";

const OrderItem = ({ item, storage }) => {
  const [imageURL, setImageURL] = React.useState("");
  React.useEffect(() => {
    getDownloadURL(ref(storage, item.imageRef)).then((url) => {
      setImageURL(url);
    });
  }, [imageURL, item, storage]);
  return (
    <Box
      display="flex"
      key={"item-" + item?.ID}
      sx={{ height: 120 }}
      p={1}
      pt={0}
    >
      <Box component="img" sx={{ borderRadius: 2 }} src={imageURL} mr={2} />
      <Box>
        <Link href={"/items/" + item.ID} underline="none">
          <Typography variant="h6">
            <b>{item.name}</b>
          </Typography>
        </Link>
        <Typography variant="subtitle1">
          {"Quantity: " + item.quantity}
        </Typography>
        {item.filters.map((filter, i) => (
          <Typography
            variant="subtitle1"
            key={"item-" + item.ID + "-filter-" + filter.name}
          >
            {filter.name + ": " + filter.value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const Order = ({ order, db }) => {
  const { storage } = useFirebase();
  const { date, ID, cost, estimatedArrivalDate, items } = order;
  const cancelOrder = (_) => {
    deleteDoc(doc(db, "orders", order.ID));
  };
  return (
    <Paper variant="outlined">
      <Box display="flex" justifyContent="space-between" p={1}>
        <Typography variant="subtitle1">{"Order ID: " + ID}</Typography>
        <Typography variant="subtitle1">{"Order Date: " + date}</Typography>
      </Box>
      <Box mb={1}>
        <Divider />
      </Box>
      {items?.map((item) => (
        <OrderItem key={item.ID} storage={storage} item={item} />
      ))}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Box>
          <Typography variant="subtitle1">{"Order Cost: " + cost}</Typography>
          <Typography variant="subtitle1">
            {"Estimated Arrival Date: " + estimatedArrivalDate}
          </Typography>
        </Box>
        <Button variant="contained" sx={{ height: 40 }} onClick={cancelOrder}>
          Cancel Order
        </Button>
      </Box>
    </Paper>
  );
};

export const MyOrdersView = () => {
  const { firestore: db } = useFirebase();
  const { user } = useAuthState();
  const [snapshot, loading] = useCollection(
    query(collection(db, "orders"), where("userID", "==", user.uid))
  );
  const orders = !snapshot
    ? []
    : snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return {
          date: data.orderDate,
          ID: id,
          estimatedArrivalDate: data.arrivalDate,
          cost: data.cost,
          items: data.items.map((item) => ({
            filters: [...item.filters],
            quantity: item.quantity,
            name: item.name,
            imageRef: item.imageRef,
            ID: item.imageRef, // We lazy out here...
          })),
        };
      });
  return (
    <Container maxWidth="md">
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box mb={4}>
          <Box mt={2}>
            <Typography variant="h4">{"My Orders"}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="subtitle1">
              {orders.length + " orders placed"}
            </Typography>
          </Box>
          {orders.map((order, i) => (
            <Box mb={"12px"} key={"order-" + order.ID}>
              <Order order={order} db={db} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};
