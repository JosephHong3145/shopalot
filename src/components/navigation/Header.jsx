import { AccountCircle, ShoppingBasketRounded } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(8),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function OverallNavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "navbar-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>MyProfile</MenuItem>
      <MenuItem onClick={handleMenuClose}>MyOrders</MenuItem>
      <MenuItem onClick={handleMenuClose}>SignUp</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <ListItemIcon>
          {" "}
          <Logout /> Sign Out
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
  // redirect onClick to MyProfile, etc...???????
  /* <Link to={!user && "/login"}>
      <div onClick={handleAuthentication} className="header-option">
            <span className="header-optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
        <span className="header-optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
      </div>
    </Link>
  */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color={"inherit"}
            aria-label="blur circle"
            sx={{ mr: 2 }}
          >
            <BlurOnIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Shopalot
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              disablePortal
              id="combo-box"
              options={allProducts}
              renderInput={(params) => <TextField {...params} />}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={handleMenuClose} // should be handle mycart later
              color="inherit"
            >
              <ShoppingBasketRounded />
              <Typography>MyCart</Typography>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account details of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
const allProducts = [
  { label: "Adidas Grand Court Sneakers" },
  { label: "Samsung TV" },
  { label: "Macbook Air" },
  { label: "Elastic Headbands" },
  { label: "Kids Toys" },
  { label: "Christmas Decorations" },
  { label: "Champion Hoodie" },
  { label: "Cat Toys" },
  { label: "Baby Yoda" },
];
