import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: { main: "#EDF4ED" },
    extra: { main: "#79B791" },
  },
});

export const useStyle = makeStyles(() => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));
