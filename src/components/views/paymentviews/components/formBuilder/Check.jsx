import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { at } from "lodash";
import { useField } from "formik";
import React from "react";

export function Check(props) {
  const { label, onDisabledChange, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;
  React.useEffect(() => {
    onDisabledChange(field.value);
  }, [field.value, onDisabledChange]);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.value}
        checked={field.value}
        control={<Checkbox {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
}
