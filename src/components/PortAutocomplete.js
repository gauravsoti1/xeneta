import React, { useMemo } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const options = [
  {
    code: "CNSGH",
    name: "Shanghai",
  },
  {
    code: "NLRTM",
    name: "Rotterdam",
  },
];

export default function PortAutocomplete({ selectedPort, label, onChange }) {
  return (
    <Autocomplete
      id="from-port-autocomplete"
      options={options}
      value={selectedPort}
      onChange={onChange}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
