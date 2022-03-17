import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import OverallNavBar from "../navigation/NavBar"; // ??HOW TO ADD NAVBAR HERE (only other page +ItemView)
// No need to import OverallNav in here since we'll be importing itemsView into HomeView (and below havbar)
import { collection, getDocs } from "firebase/firestore";
import { matchSorter } from "match-sorter";
import { render } from "react-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import Item from "../modular/Item";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export const ItemsView = () => {
  const { firestore: db, storage } = useFirebase();
  const [snapshot, loading] = useCollection(collection(db, "items"));
  const [query, setQuery] = React.useState("");
  const [docs, setDocs] = React.useState([]);
  React.useEffect(() => {
    if (snapshot?.docs) {
      const categories = [
        ...new Set(snapshot.docs.map((doc) => doc.data().category)),
      ];
      if (query === "") {
        setDocs([...snapshot.docs]);
      } else {
        const i = categories.findIndex(
          (category) => category.toLowerCase() === query.toLowerCase()
        );
        if (i !== -1) {
          setDocs(
            snapshot.docs.filter(
              (doc) => doc.data().category === categories.at(i)
            )
          );
        } else {
          const names = snapshot.docs.map((doc) => doc.data().itemName);
          const fuzzyNames = matchSorter(names, query);
          setDocs(
            fuzzyNames.map(
              (name) =>
                snapshot.docs[names.findIndex((_name) => _name === name)]
            )
          );
        }
      }
    }
  }, [snapshot, query]);
  // const items = [
  //   <Item
  //     key={"item1"}
  //     title={"Adidas Grand Court Sneakers"}
  //     price={"$53.00 CAD"}
  //     description={"Leather and Synthetic"}
  //     image={
  //       "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg"
  //     }
  //     alt={""}
  //   />,
  //   <Item
  //     key={"item2"}
  //     title={"Samsung TV"}
  //     price={"$600.00 CAD"}
  //     description={"58 inch crystal UHD display"}
  //     image={
  //       "https://images.samsung.com/is/image/samsung/latin-en-uhd-tu8000-un58tu8000pxpa-frontblack-286008980?$720_576_PNG$"
  //     }
  //     alt={"this image alt"}
  //   />,
  // ]; // import component you created instead and pass props created in the other const(price, itemname..)
  return (
    <Container maxWidth="xl">
      <Box mt={3}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Box>
      <Box>
        {!loading ? (
          <Box display="flex" flexWrap="wrap">
            {docs.map((item) => {
              const id = item.id;
              const data = item.data();
              return (
                <Box key={id} sx={{ width: "33%" }}>
                  {" "}
                  <Item
                    id={id}
                    itemName={data.itemName}
                    imageRef={data.image.ref}
                    price={data.price}
                    storage={storage}
                    seller={data.seller}
                    category={data.category}
                    condition={data.condition}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

// map
