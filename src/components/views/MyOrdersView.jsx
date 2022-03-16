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
import { collection, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

import React from "react";

const placeholder = {
  orders: [
    {
      date: new Date(),
      ID: "1",
      estimatedArrivalDate: new Date(),
      cost: 50.99,
      items: [
        {
          ID: "1",
          name: "Black Box",
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          quantity: 3,
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
        {
          ID: "2",
          name: "Black Box",
          quantity: 3,
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
      ],
    },
    {
      date: new Date(),
      ID: "2",
      estimatedArrivalDate: new Date(),
      cost: 50.99,
      items: [
        {
          ID: "3",
          name: "Black Box",
          quantity: 3,
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
        {
          ID: "4",
          name: "Black Box",
          quantity: 3,
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
      ],
    },
    {
      date: new Date(),
      ID: "3",
      estimatedArrivalDate: new Date(),
      cost: 50.99,
      items: [
        {
          ID: "5",
          name: "Black Box",
          quantity: 3,
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
        {
          ID: "6",
          name: "Black Box",
          quantity: 3,
          imageRef:
            "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
          filters: [
            { name: "Size", value: "12" },
            { name: "Color", value: "Black" },
          ],
        },
      ],
    },
  ],
};

const Order = ({ order }) => {
  const { storage } = useFirebase();
  const [imageURLs, setImageURLs] = React.useState(
    Array.from({ length: order.items.length }, () => "")
  );
  React.useEffect(() => {
    order.items.forEach((item, i) => {
      getDownloadURL(ref(storage, item.imageRef)).then((url) => {
        const newImageURLs = [...imageURLs];
        newImageURLs[i] = url;
        setImageURLs(newImageURLs);
      });
    });
  }, [imageURLs, order.items, storage]);
  const { date, ID, cost, estimatedArrivalDate, items } = order;
  return (
    <Paper variant="outlined">
      <Box display="flex" justifyContent="space-between" p={1}>
        <Typography variant="subtitle1">{"Order ID: " + ID}</Typography>
        <Typography variant="subtitle1">{"Order Date: " + date}</Typography>
      </Box>
      <Box mb={1}>
        <Divider />
      </Box>
      {items.map((item, i) => (
        <Box
          display="flex"
          key={"item-" + item.ID}
          sx={{ height: 120 }}
          p={1}
          pt={0}
        >
          <Box
            component="img"
            sx={{ borderRadius: 2 }}
            src={imageURLs[i]}
            mr={2}
          />
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
        <Button variant="contained" sx={{ height: 40 }}>
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
        <Box>
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
              <Order order={order} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};
