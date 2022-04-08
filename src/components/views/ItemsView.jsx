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
