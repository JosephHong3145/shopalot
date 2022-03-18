import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Grow,
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
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";

const placeholder = {
  // imageURL:
  //   "https://di2ponv0v5otw.cloudfront.net/posts/2018/07/10/5b45a8162140f3f8d4b2e9b2/m_5b45a818534ef923d7f95f2c.jpeg",
  itemName: "Adidas Grand Court Sneakers",
  seller: "Malek",
  ratingsCount: [1, 5, 3, 13, 73],
  category: "Men's Shoes",
  price: "$53.00 CAD",
  sizeOptions: ["7", "8", "9", "10", "11", "12"],
  colorOptions: ["Green", "Blue", "Black", "Yellow"],
  stock: 3,
  sellerLocation: "Montreal, Quebec",
  refundPolicy: "30 days refund",
  orderProcessingDelay: 3,
  condition: "Mint / Unopened",
  productDescription: `
  • Leather and Synthetic\n
  • Rubber sole\n
  • Shaft measures approximately low-top from arch\n
  • Platform measures approximately 1 inches\n
  • A '70s style Reborn\n
  • These shoes take inspiration from iconic sport styles of the past and move them into the future\n
  • The shoes craft an everyday look with a smooth leather upper\n
  • Signature 3-stripes flash along the sides\n
  • Plush midsole cushioning gives comfort to every step
  `,
  productSpecifications: [
    { name: "Model", value: "A515-56-58K6" },
    { name: "Operating System", value: "Windows 10 Home" },
    { name: "Processor Speed", value: "2.40 GHz" },
    { name: "Storage Type", value: "SSD (Solid State Drive}" },
    { name: "Brand", value: "Acer" },
  ],
  questions: [
    {
      id: "1",
      text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      upvotes: 0,
    },
    {
      id: "2",
      text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      upvotes: -3,
    },
    {
      id: "3",
      text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      upvotes: 5,
    },
  ],
  reviews: [
    {
      id: "1",
      author: "Malek",
      date: new Date(),
      rating: 4,
      title: "Great product! Would recommend to everyone!",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris libero, posuere eget nibh sit amet, feugiat cursus elit. Phasellus quis risus justo. Cras ut sapien at urna porttitor pulvinar. Fusce id magna pulvinar, pulvinar felis at, congue neque. Nunc id nisl faucibus dui maximus rutrum id convallis nibh. Sed id eros nec justo lobortis iaculis ac vitae nunc. Pellentesque blandit eros ipsum, sed dapibus magna molestie non. Donec imperdiet pharetra erat, in vestibulum elit pulvinar ut. Praesent nunc dui, convallis ut ullamcorper sit amet, consequat a lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sodales lectus nec euismod tempor.",
    },
    {
      id: "2",
      author: "Malek",
      date: new Date(),
      rating: 3.5,
      title: "I changed my mind, it kinda sucks...",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris libero, posuere eget nibh sit amet, feugiat cursus elit. Phasellus quis risus justo. Cras ut sapien at urna porttitor pulvinar. Fusce id magna pulvinar, pulvinar felis at, congue neque. Nunc id nisl faucibus dui maximus rutrum id convallis nibh. Sed id eros nec justo lobortis iaculis ac vitae nunc. Pellentesque blandit eros ipsum, sed dapibus magna molestie non. Donec imperdiet pharetra erat, in vestibulum elit pulvinar ut. Praesent nunc dui, convallis ut ullamcorper sit amet, consequat a lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sodales lectus nec euismod tempor.",
    },
    {
      id: "3",
      author: "Malek",
      date: new Date(),
      rating: 4.5,
      title: "Nvm, Hella Good!",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris libero, posuere eget nibh sit amet, feugiat cursus elit. Phasellus quis risus justo. Cras ut sapien at urna porttitor pulvinar. Fusce id magna pulvinar, pulvinar felis at, congue neque. Nunc id nisl faucibus dui maximus rutrum id convallis nibh. Sed id eros nec justo lobortis iaculis ac vitae nunc. Pellentesque blandit eros ipsum, sed dapibus magna molestie non. Donec imperdiet pharetra erat, in vestibulum elit pulvinar ut. Praesent nunc dui, convallis ut ullamcorper sit amet, consequat a lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sodales lectus nec euismod tempor.",
    },
  ],
};

const QuestionComponent = (props) => {
  const { question } = props;
  const { text, answer, upvotes } = question;
  return (
    <Box display="flex" mt={3}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton>
          <KeyboardArrowUpIcon fontSize="large" color="info" />
        </IconButton>
        <Typography>{upvotes}</Typography>
        <IconButton>
          <KeyboardArrowDownIcon fontSize="large" color="info" />
        </IconButton>
      </Box>
      <Box ml={2}>
        <Divider orientation="vertical" />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" ml={2}>
        <Typography>
          <b>{"Question: "}</b>
          {text}
        </Typography>
        <Box mt={1}>
          <Typography>
            <b>{"Answer: "}</b>
            {answer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ItemView = () => {
  const { itemId } = useParams();
  const { user } = useAuthState();
  const { firestore: db, storage } = useFirebase();
  const [item] = useDocumentData(doc(db, "items", itemId));
  const [categoryFilters, setCategoryFilters] = React.useState([]);
  const [categoryFilterValues, setCategoryFilterValues] = React.useState([
    "None",
    "None",
  ]);
  const [quantity, setQuantity] = React.useState(1);
  const { stock, price } = item?.filterCombinations.find((combination) => {
    if (combination.filters.length === 0) return false;
    if (
      combination.filters.length === 1 &&
      combination.filters[0] !== categoryFilterValues[0]
    )
      return false;
    if (
      combination.filters.length === 2 &&
      (combination.filters[0] !== categoryFilterValues[0] ||
        combination.filters[1] !== categoryFilterValues[1])
    )
      return false;
    return true;
  }) || { stock: 0, price: 0 };
  React.useEffect(() => {
    if (stock === 0) {
      setQuantity(0);
    } else {
      setQuantity(1);
    }
  }, [stock]);
  React.useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "categories"), where("name", "==", item.category))
      );
      setCategoryFilters(querySnapshot.docs[0].data().filters);
    };
    if (item?.category) {
      fetchData();
    }
  }, [db, item]);

  const [imageURL, setImageURL] = React.useState("");
  if (item) {
    getDownloadURL(ref(storage, item.image.ref)).then((url) => {
      setImageURL(url);
    });
  }
  const earliestDelivery = new Date();
  earliestDelivery.setDate(
    earliestDelivery.getDate() + Number(item?.orderProcessingDelay) ?? 0
  );
  let totalRatings = 0;
  placeholder.ratingsCount.forEach((ratingCount) => {
    totalRatings += ratingCount;
  });
  let averageRating = 0;
  placeholder.ratingsCount.forEach((ratingCount, i) => {
    averageRating = (i + 1) * (ratingCount / totalRatings);
  });
  averageRating = Math.ceil(averageRating * 2) / 2;
  const addItemToCart = (_) => {
    const _item = {
      filters: categoryFilters.map((filter, i) => ({
        name: filter.name,
        value: categoryFilterValues[i],
      })),
      imageRef: item.image.ref,
      name: item.itemName,
      quantity: quantity,
      seller: item.seller,
      price: price,
      userId: user.uid,
    };
    addDoc(collection(db, "cart"), _item);
  };
  return item ? (
    <Container maxWidth="xl">
      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box sx={{ height: "445px", borderRadius: 2 }}>
              {imageURL === "" ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: 1 }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={imageURL}
                  sx={{
                    width: 1,
                    height: 1,
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              {"Category > "}
              <Link href="#" underline="none">
                {item.category}
              </Link>
            </Typography>
            <Typography variant="h5">
              <b>{item.itemName}</b>
            </Typography>
            <Typography variant="subtitle2">
              <b>
                {"Sold By: "}
                <Link href="#" underline="none">
                  {item.seller}
                </Link>
              </b>
            </Typography>
            <Box display="flex">
              <Rating value={averageRating} precision={0.5} readOnly />
              <Box ml={1} mb={1}>
                <Typography>
                  <Link href="#" underline="none">
                    {totalRatings + " ratings"}
                  </Link>
                </Typography>
              </Box>
            </Box>
            <Divider light />
            <Box mt={2}>
              <Typography
                variant="h4"
                color={stock > 0 ? "primary.dark" : "error"}
              >
                <b>{stock === 0 ? "Item Unavailable" : "$" + price + " CAD"}</b>
              </Typography>
            </Box>
            <Box mt={2}>
              {categoryFilters.length > 0 && (
                <Box>
                  <InputLabel id="first-filter-select-label">
                    {categoryFilters[0].name}
                  </InputLabel>
                  <Select
                    labelId="first-filter-select-label"
                    value={categoryFilterValues[0]}
                    onChange={(event) =>
                      setCategoryFilterValues([
                        event.target.value,
                        categoryFilterValues[1],
                      ])
                    }
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value={"None"}>{"None"}</MenuItem>
                    {categoryFilters[0].options.map((value) => (
                      <MenuItem
                        key={"first-filter-option-" + value}
                        value={value}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            </Box>
            <Box mt={1}>
              {categoryFilters.length > 1 && (
                <Box>
                  <InputLabel id="second-filter-select-label">
                    {categoryFilters[1].name}
                  </InputLabel>
                  <Select
                    value={categoryFilterValues[1]}
                    labelId="second-filter-select-label"
                    fullWidth
                    variant="outlined"
                    onChange={(event) =>
                      setCategoryFilterValues([
                        categoryFilterValues[0],
                        event.target.value,
                      ])
                    }
                  >
                    <MenuItem value={"None"}>{"None"}</MenuItem>
                    {categoryFilters[1].options.map((value) => (
                      <MenuItem
                        key={"second-filter-option-" + value}
                        value={value}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Paper variant="outlined" sx={{ height: 1 }}>
              <Box m={3}>
                <Typography variant="h6" gutterBottom>
                  {stock === 0 ? "Item Unavailable" : "$" + price + " CAD"}
                </Typography>
                <Divider light />
                <Box mt={1}>
                  <Typography variant="subtitle2">
                    <b>{"Condition: "}</b>
                    {item.condition}
                  </Typography>
                  {/* <Typography variant="subtitle2">
                    <b>{"Ships From: "}</b>
                    {placeholder.sellerLocation}
                  </Typography> */}
                  <Typography variant="subtitle2">
                    <b>{"Earliest Delivery: "}</b>
                    {earliestDelivery.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>{"Refund Policy: "}</b>
                    {item.refundPolicy}
                  </Typography>
                </Box>
                <Box mt={1}>
                  <Divider light />
                </Box>
                <Box mt={1}>
                  <Typography
                    variant="h6"
                    color={stock > 0 ? "primary.dark" : "error"}
                  >
                    <b>
                      {stock > 0 ? "In Stock (" + stock + ")" : "Not In Stock"}
                    </b>
                  </Typography>
                </Box>
                <Box mt={1}>
                  <TextField
                    type="number"
                    label="Quantity"
                    variant="filled"
                    disabled={!stock}
                    value={quantity}
                    fullWidth
                    inputProps={{ min: 1, max: stock }}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (value < 1) setQuantity(1);
                      else if (value > stock) setQuantity(stock);
                      else setQuantity(value);
                    }}
                  />
                </Box>
                <Box mt={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!stock}
                    onClick={addItemToCart}
                  >
                    {"Add to Cart"}
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={true || !stock}
                  >
                    {"Buy Now"}
                  </Button>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  pt={"16px"}
                >
                  <LockIcon color="primary" />
                  <Box ml={"4px"}>
                    <Typography color="primary.dark">
                      {"Transaction Secured with SSL"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Divider light />
      </Box>
      <Box mt={3}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="h5">
              <b>{"Product Description"}</b>
            </Typography>
            <Box mt={3}>
              <Typography
                paragraph
                style={{ whiteSpace: "pre-line", lineHeight: 2 }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">
              <b>{"Product Specifications"}</b>
            </Typography>
            <Box mt={3}>
              <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 1 }}>
                  <TableBody>
                    {item.productSpecifications.map(({ name, value }) => (
                      <TableRow key={"specifications-table-row-" + name}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Divider light />
      </Box>
      <Box mt={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">
            <b>{"Questions & Answers"}</b>
          </Typography>
          <Button>
            <b>{"Add Question For Seller"}</b>
          </Button>
        </Box>
        {placeholder.questions.map((question) => (
          <QuestionComponent
            key={"question-" + question.id}
            question={question}
          />
        ))}
      </Box>
      <Box mt={3}>
        <Divider light />
      </Box>
      <Box mt={3} mb={6}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Typography variant="h5">
              <b>{"Customer Reviews"}</b>
            </Typography>
            <Box mt={3} sx={{ width: 1 }}>
              <Box display="flex">
                <Rating value={averageRating} precision={0.5} />
                <Box ml={1}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {totalRatings + " Ratings"}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                {placeholder.ratingsCount
                  .slice(0)
                  .reverse()
                  .map((ratingCount, _i) => {
                    const i = placeholder.ratingsCount.length - _i;
                    const value = Math.round(
                      (ratingCount / totalRatings) * 100
                    );
                    return (
                      <Box
                        key={"rating-" + i.toString()}
                        display="flex"
                        alignItems="center"
                        mt={1}
                      >
                        <Box sx={{ minWidth: 60 }}>
                          <Typography>{i + " Star"}</Typography>
                        </Box>
                        <Box sx={{ width: 1, mr: 1 }}>
                          <LinearProgress
                            sx={{ height: 8, borderRadius: 5 }}
                            variant="determinate"
                            value={value}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >{`${value}%`}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-between">
              <Select
                value={"Highest Rating"}
                variant="standard"
                renderValue={(value) => <Box pl={1}>{value}</Box>}
              >
                <MenuItem value={"Highest Rating"}>{"Highest Rating"}</MenuItem>
                <MenuItem value={"Lowest Rating"}>{"Lowest Rating"}</MenuItem>
                <MenuItem value={"Newest"}>{"Newest"}</MenuItem>
                <MenuItem value={"Oldest"}>{"Oldest"}</MenuItem>
              </Select>
              <Button>
                <b>{"Add Customer Review"}</b>
              </Button>
            </Box>
            <Box pt={1}>
              {placeholder.reviews.map((review) => {
                return (
                  <Box mt={2} key={"review-" + review.id}>
                    <Card sx={{ width: 1 }} variant="outlined">
                      <CardHeader
                        avatar={<Avatar>M</Avatar>}
                        title={"Reviewed by " + review.author}
                        subheader={review.date.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        action={
                          <Box display="flex">
                            <IconButton disabled color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton disabled color="error">
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      />
                      <CardContent sx={{ paddingTop: 0 }}>
                        <Box display="flex" mb={1} alignItems="center">
                          <Rating
                            value={review.rating}
                            precision={0.5}
                            readOnly
                          />
                          <Box ml={1}>
                            <Typography variant={"subtitle1"}>
                              <b>{review.title}</b>
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {review.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    </Container>
  );
};
