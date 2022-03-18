import { Paper } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { theme, useStyle } from "./PageLayoutStyle";
import React from "react";

export function PageLayout(props) {
  const { children } = props;
  const classes = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Paper className={classes.paper}>{children}</Paper>
      </div>
    </ThemeProvider>
  );
}
