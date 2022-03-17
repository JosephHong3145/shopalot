import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  Select,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Condition } from "../../constants";
import { Controller, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "../../contexts/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

export const FilterList = (props) => {
  const { label, name, options, onNameChange, onOptionsChange } = props;
  const [newOption, setNewOption] = React.useState("");
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
      />
      <Box pt={2}>
        {options.length > 0 && (
          <Box mb={2} component={Paper} variant="outlined">
            <List>
              {options.map((option, i) => (
                <ListItem
                  key={"option-" + name + "-list-item-" + option}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => {
                        const _options = [...options];
                        _options.splice(i, 1);
                        onOptionsChange(_options);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Option Name"
              fullWidth
              variant="outlined"
              value={newOption}
              onChange={(event) => setNewOption(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: 1 }}
              onClick={() => onOptionsChange([...options, newOption])}
            >
              {"Add Option"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export const AddCategoryDialog = (props) => {
  const { open, onClose, onAddCategory } = props;
  const [categoryName, setCategoryName] = React.useState([""]);
  const [filtersEnabled, setFiltersEnabled] = React.useState([false, false]);
  const [filtersNames, setFiltersNames] = React.useState(["", ""]);
  const [filtersOptions, setFiltersOptions] = React.useState([[], []]);
  const category = {
    name: categoryName,
    filters: filtersEnabled
      .map(
        (enabled, i) =>
          enabled && { name: filtersNames[i], options: filtersOptions[i] }
      )
      .filter((x) => x !== false),
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Add New Category"}</DialogTitle>
      <DialogContent sx={{ minWidth: 380 }}>
        <Box mt={1} pr={1}>
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filtersEnabled[0]}
                  onChange={(_, checked) =>
                    setFiltersEnabled([
                      checked,
                      !checked ? false : filtersEnabled[1],
                    ])
                  }
                />
              }
              label="Enable Filter #1"
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filtersEnabled[1]}
                  disabled={!filtersEnabled[0]}
                  onChange={(_, checked) =>
                    setFiltersEnabled([filtersEnabled[0], checked])
                  }
                />
              }
              label="Enable Filter #2"
            />
          </FormControl>
        </Box>
        <Box pr={1} sx={{ maxHeight: 500, overflowY: "auto" }}>
          {filtersEnabled.map(
            (filterEnabled, i) =>
              filterEnabled && (
                <Box mt={i > 0 ? 2 : 1} key={"filter-list-" + (i + 1)}>
                  {i > 0 ? <Divider /> : null}
                  <Box mt={i > 0 ? 2 : 0}>
                    <FilterList
                      label={"Filter #" + (i + 1) + " Name"}
                      name={filtersNames[i]}
                      options={filtersOptions[i]}
                      onNameChange={(name) => {
                        const _filterNames = [...filtersNames];
                        _filterNames.splice(i, 1, name);
                        setFiltersNames(_filterNames);
                      }}
                      onOptionsChange={(options) => {
                        const _filtersOptions = [...filtersOptions];
                        _filtersOptions.splice(i, 1, options);
                        setFiltersOptions(_filtersOptions);
                      }}
                    />
                  </Box>
                </Box>
              )
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"Cancel"}</Button>
        <Button onClick={() => onAddCategory(category)}>
          {"Add Category"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const CombinationList = ({ filters, value: combinations, onChange }) => {
  const filterCombinations = filters[0].options
    .map((x) => filters[1]?.options.map((y) => [x, y]) || [[x]])
    .flat();
  return (
    <Paper variant="outlined">
      {filterCombinations.map((filterCombination) => {
        const i = combinations.findIndex((v) => {
          return v.filters.every(
            (filter, i) => filter === filterCombination[i]
          );
        });
        const combination =
          i !== -1 ? combinations.at(i) : { stock: 0, price: 0 };
        const { stock, price } = combination;
        const combinationExists = i !== -1;
        const onToggleRadioButton = (_) => {
          if (combinationExists) {
            const newCombinations = [...combinations];
            newCombinations.splice(i, 1);
            onChange(newCombinations);
          } else {
            const newCombinations = [
              ...combinations,
              { filters: filterCombination, stock: 1, price: 0 },
            ];
            onChange(newCombinations);
          }
        };

        return (
          <Box
            key={[
              "combination",
              ...filterCombination.map((filter) => "-" + filter),
            ].join()}
          >
            <Box display="flex" p={1} justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Radio
                  checked={combinationExists}
                  onClick={onToggleRadioButton}
                />
                <Box ml={2} mr={2}>
                  <Typography>
                    <b>{filters[0].name + ": "}</b>
                    {filterCombination[0]}
                  </Typography>
                </Box>
                {filters.length > 1 && (
                  <>
                    <Divider orientation="vertical" sx={{ height: 50 }} />
                    <Box ml={2}>
                      <Typography>
                        <b>{filters[1].name + ": "}</b>
                        {filterCombination[1]}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box display="flex">
                <Box mr={1}>
                  <TextField
                    margin="dense"
                    sx={{ width: 160 }}
                    InputProps={{ inputProps: { min: 0 } }}
                    type="number"
                    label="Stock"
                    disabled={!combinationExists}
                    value={stock}
                    onChange={(event) => {
                      const newCombinations = [...combinations];
                      newCombinations[i].stock = Number(event.target.value);
                      onChange(newCombinations);
                    }}
                  />
                </Box>
                <TextField
                  sx={{ width: 160 }}
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  disabled={!combinationExists}
                  value={price}
                  label="Price"
                  onChange={(event) => {
                    const newCombinations = [...combinations];
                    newCombinations[i].price = event.target.value;
                    onChange(newCombinations);
                  }}
                />
              </Box>
            </Box>
            <Divider />
          </Box>
        );
      })}
    </Paper>
  );
};

export const SpecificationsTable = (props) => {
  const { onChange } = props;
  const specifications = props.value;
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");
  return (
    <Box mt={2}>
      {specifications.length > 0 && (
        <Box>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 1 }}>
              <TableBody>
                {specifications.map(({ name, value }, i) => (
                  <TableRow key={"specifications-table-row-" + name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>{value}</Box>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const _specifications = [...specifications];
                            _specifications.splice(i, 1);
                            onChange(_specifications);
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Value"
              variant="outlined"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => onChange([...specifications, { name, value }])}
              variant="contained"
              fullWidth
              sx={{ height: 1 }}
            >
              {"Add Specification"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export const EditItemView = () => {
  const { firestore: db, storage } = useFirebase();
  const { user } = useAuthState();
  const navigate = useNavigate();
  const [value] = useCollection(collection(db, "categories"));
  const categories = value?.docs.map((doc) => doc.data()) ?? [];
  const { itemId } = useParams();
  const isNewItem = !itemId;
  const conditionKeys = Object.keys(Condition);
  const [imageUploading, setImageUploading] = React.useState(false);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] =
    React.useState(false);
  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      itemName: "",
      condition: Condition.Mint.name,
      refundPolicy: "",
      orderProcessingDelay: 0,
      description: "",
      image: {
        name: "",
        ref: "",
      },
      productSpecifications: [],
      category: {
        name: "None",
        filters: [],
      },
      filterCombinations: [],
    },
  });
  const currentCategory = watch("category");
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      category: data.category.name,
      seller: user.displayName,
    };
    const docRef = await addDoc(collection(db, "items"), newData);
    navigate(`/items/${docRef.id}`);
  };
  const onImageChange = (image, onChange) => {
    onChange(image);
  };
  const onCategoryChange = (name, onChange) => {
    let newCategory = { name, filters: [] };
    if (name !== "None") {
      newCategory = categories.find((category) => category.name === name);
    }
    onChange(newCategory);
  };
  return (
    <Box>
      <Box mt={3} mb={formState.isDirty ? 12 : 2}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom>
            {isNewItem ? "Create New Item" : "Edit Item"}
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="itemName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        label="Item Name"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="condition-select-label">
                      {"Condition"}
                    </InputLabel>
                    <Controller
                      name="condition"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          labelId="condition-select-label"
                          label="Condition"
                          onChange={onChange}
                          value={value}
                        >
                          {Object.values(Condition).map((condition, i) => (
                            <MenuItem
                              key={"condition-select-" + conditionKeys[i]}
                              value={condition.name}
                            >
                              {condition.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="refundPolicy"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        label="Refund Policy"
                        variant="outlined"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="orderProcessingDelay"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        label="Order Processing Delay (Days)"
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Description"
                    multiline
                    rows={8}
                    fullWidth
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Box>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value: image } }) => (
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
                      setImageUploading(true);
                      uploadBytes(
                        storageRef,
                        await event.target.files[0].arrayBuffer()
                      ).then(() => {
                        onImageChange(
                          { name: event.target.files[0].name, ref: uuid },
                          onChange
                        );
                        setImageUploading(false);
                      });
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{ minWidth: 220, height: 50 }}
                    >
                      Choose Image
                    </Button>
                  </label>
                  <Box ml={2} display="flex" alignItems="center">
                    {!imageUploading ? (
                      <Typography
                        color={
                          image.name === "" ? "textSecondary" : "textPrimary"
                        }
                      >
                        {image.name === ""
                          ? "No Image Was Selected"
                          : image.name}
                      </Typography>
                    ) : (
                      <CircularProgress size={28} />
                    )}
                  </Box>
                </Box>
              )}
            />
            <Box mt={2}>
              <Divider />
            </Box>
            <Box mt={2}>
              <Controller
                name="productSpecifications"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SpecificationsTable value={value} onChange={onChange} />
                )}
              />
            </Box>
            <Box mt={2}>
              <Divider />
            </Box>
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="category-select-label">
                      {"Category"}
                    </InputLabel>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field: { onChange, value: _category } }) => (
                        <Select
                          labelId="category-select-label"
                          label="Category"
                          value={_category?.name}
                          onChange={(event) =>
                            onCategoryChange(event.target.value, onChange)
                          }
                        >
                          <MenuItem value={"None"}>{"None"}</MenuItem>
                          {Object.values(categories).map((category, i) => (
                            <MenuItem
                              key={"condition-select-" + category.name}
                              value={category.name}
                            >
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: 1 }}
                    onClick={() => setAddCategoryDialogOpen(true)}
                  >
                    Add New Category
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box pt={2}>
              {currentCategory?.filters.length !== 0 && (
                <Controller
                  name="filterCombinations"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CombinationList
                      filters={currentCategory?.filters}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              )}
            </Box>
            <Snackbar
              width={1}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={formState.isDirty}
              message="Form has been edited"
              action={
                <Box pl={20}>
                  <Button type="submit">Create Item</Button>
                </Box>
              }
            />
          </form>
        </Container>
        <AddCategoryDialog
          open={addCategoryDialogOpen}
          onClose={() => setAddCategoryDialogOpen(false)}
          onAddCategory={(category) => {
            addDoc(collection(db, "categories"), category);
            setAddCategoryDialogOpen(false);
          }}
        />
      </Box>
    </Box>
  );
};
