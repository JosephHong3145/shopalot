import { AccountCircle, ShoppingBasketRounded } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { Paths } from "../../paths";
import { signOut } from "firebase/auth";
import { useAuthState } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";
import { useLocation, useNavigate } from "react-router-dom";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Box from "@mui/material/Box";
import React from "react";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.1),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(8),
//     width: "50%",
//   },
// }));

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

export default function NavBar() {
  const { auth } = useFirebase();
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();
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
      <MenuItem onClick={handleMenuClose} disabled={true}>
        My Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/my-orders");
        }}
      >
        My Orders
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(Paths.createItem());
        }}
        disabled={!isAuthenticated}
      >
        Create Item
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(Paths.login());
        }}
        disabled={isAuthenticated}
      >
        Sign In
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          signOut(auth);
        }}
        disabled={!isAuthenticated}
      >
        Log Out
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/about-us");
        }}
      >
        About Us
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Logout /> Sign Out
        </ListItemIcon>
      </MenuItem> */}
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
    location.pathname === Paths.login() ||
    location.pathname === Paths.signup() || (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="end"
              color={"inherit"}
              aria-label="blur circle"
              sx={{ mr: 2 }}
              href={Paths.items()}
            >
              <BlurOnIcon />
            </IconButton>
            <Link
              href={Paths.items()}
              sx={{ color: "inherit" }}
              underline="none"
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Shopalot
              </Typography>
            </Link>

            {/* <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Autocomplete
          disablePortal
          id="combo-box"
          options={allProducts}
          renderInput={(params) => <TextField {...params} />}
        />
      </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
          onClick={handleMenuClose} // should be handle mycart later
          color="inherit"
        >
          <ShoppingBasketRounded />
          <Typography>MyCart</Typography>
        </IconButton> */}
              <Button color="inherit" href="/my-cart">
                <Box pr={1} pl={1} display="flex" alignItems="center">
                  <ShoppingBasketRounded />
                  <Box ml={1}>
                    <Typography variant="subtitle2">{"My Cart"}</Typography>
                  </Box>
                </Box>
              </Button>
              <IconButton
                size="large"
                edge="end"
                aria-label="account details of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    )
  );
}
