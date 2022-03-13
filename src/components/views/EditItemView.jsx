import {
  Box,
  Button,
  Checkbox,
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
  OutlinedInput,
  Paper,
  Radio,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Condition } from "../../constants";
import { useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

const categories = [
  {
    name: "Men's Shoes",
    filters: [
      {
        name: "Size",
        options: ["7", "8", "9", "10", "11", "12"],
      },
      {
        name: "Color",
        options: ["Green", "Blue", "Black", "Yellow"],
      },
    ],
  },
];

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
  const [filtersEnabled, setFiltersEnabled] = React.useState([false, false]);
  const [filtersNames, setFiltersNames] = React.useState(["", ""]);
  const [filtersOptions, setFiltersOptions] = React.useState([[], []]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Add New Category"}</DialogTitle>
      <DialogContent sx={{ minWidth: 380 }}>
        <Box mt={1} pr={1}>
          <TextField fullWidth label="Category Name" />
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
        <Button onClick={onAddCategory}>{"Add Category"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export const CombinationList = ({ filters }) => {
  const combinations = filters[0].options
    .map((x) => filters[1]?.options.map((y) => [x, y]) || [[x]])
    .flat();
  return (
    <Paper variant="outlined">
      {combinations.map((combination) => (
        <Box
          key={[
            "combination",
            ...combination.map((filter) => "-" + filter),
          ].join()}
        >
          <Box display="flex" p={1} justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Radio checked={true} />
              <Box ml={2} mr={2}>
                <Typography>
                  <b>{filters[0].name + ": "}</b>
                  {combination[0]}
                </Typography>
              </Box>
              {filters.length > 1 && (
                <>
                  <Divider orientation="vertical" sx={{ height: 50 }} />
                  <Box ml={2}>
                    <Typography>
                      <b>{filters[1].name + ": "}</b>
                      {combination[1]}
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
                  type="number"
                  label="Stock"
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
                label="Price"
              />
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}
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
  const { itemId } = useParams();
  const isNewItem = !itemId;
  const conditionKeys = Object.keys(Condition);
  const [specifications, setSpecifications] = React.useState([]);
  const [imageName, setImageName] = React.useState("");
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] =
    React.useState(false);
  return (
    <Box>
      <Box mt={3}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom>
            {isNewItem ? "Create New Item" : "Edit Item"}
          </Typography>
          <Divider />
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Item Name" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="condition-select-label">
                    {"Condition"}
                  </InputLabel>
                  <Select labelId="condition-select-label" label="Condition">
                    {Object.values(Condition).map((condition, i) => (
                      <MenuItem
                        key={"condition-select-" + conditionKeys[i]}
                        value={condition.name}
                      >
                        {condition.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Refund Policy" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Order Processing Delay (Days)"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <TextField label="Description" multiline rows={8} fullWidth />
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <input
              accept="image/*"
              hidden
              id="raised-button-file"
              multiple
              type="file"
              onChange={(event) => setImageName(event.target.files[0].name)}
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
            <Box ml={2}>
              <Typography
                color={imageName === "" ? "textSecondary" : "textPrimary"}
              >
                {imageName === "" ? "No Image Was Selected" : imageName}
              </Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <Divider />
          </Box>
          <Box mt={2}>
            <SpecificationsTable
              value={specifications}
              onChange={(specifications) => setSpecifications(specifications)}
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
                  <Select labelId="category-select-label" label="Category">
                    {Object.values(categories).map((category, i) => (
                      <MenuItem
                        key={"condition-select-" + category.name}
                        value={i}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
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
          <Box pt={2} pb={2}>
            {categories[0].filters.length !== 0 && (
              <CombinationList filters={categories[0].filters} />
            )}
          </Box>
        </Container>
        <AddCategoryDialog
          open={addCategoryDialogOpen}
          onClose={() => setAddCategoryDialogOpen(false)}
          onAddCategory={undefined}
        />
      </Box>
    </Box>
  );
};
