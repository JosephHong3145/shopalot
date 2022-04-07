import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import React from "react";

export function FormikSelect(props) {
  const { errorText, label, options, ...rest } = props;
  const [field, meta, helper] = useField(props);

  function _onChange(e) {
    helper.setValue(e.target.value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={label + "-label"}>{label}</InputLabel>
      <Select
        id={label + "-label"}
        label={label}
        value={field.value}
        onChange={_onChange}
      >
        {options.map((option) => (
          <MenuItem key={label + "-" + option.key} value={option.value}>
            {option.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
