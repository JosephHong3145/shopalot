import { TextField } from "@mui/material";
import { at } from "lodash";
import { useField } from "formik";
import React from "react";

export function Field(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  function helperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type="text"
      error={meta.touched && meta.error && true}
      helperText={helperText()}
      {...field}
      {...rest}
    />
  );
}
