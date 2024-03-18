import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../../../Button/ButtonInput";

const initialValue = {
  IndConAgg: false,
  BacCheak: false,
  HIPAA: false,
  nonDisAgg: false,
  licDoc: false,
};

const OnBording = () => {
  const [checked, setChecked] = useState(initialValue);
  const handleCheckBox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={3}>
      <Typography variant="h6" mb={3} mt={2}>
        <b>Onbording</b>
      </Typography>
      <Box display="flex" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="IndConAgg"
              checked={checked.IndConAgg}
              onChange={handleCheckBox}
            />
          }
          label="Independent Contractor Aggrement"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {checked.IndConAgg ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="BacCheak"
              checked={checked.BacCheak}
              onChange={handleCheckBox}
            />
          }
          label="Background Check"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {checked.BacCheak ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="HIPAA"
              checked={checked.HIPAA}
              onChange={handleCheckBox}
            />
          }
          label="HIPAA Compliance"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {checked.HIPAA ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="nonDisAgg"
              checked={checked.nonDisAgg}
              onChange={handleCheckBox}
            />
          }
          label="Non-Disclosure Agreement"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {checked.nonDisAgg ? <Button name="View" /> : null}
      </Box>
      <Box display="flex" gap={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="licDoc"
              checked={checked.licDoc}
              onChange={handleCheckBox}
            />
          }
          label="Licence Document"
          sx={{ width: "310px" }}
        />
        <Button name="Upload" />
        {checked.licDoc ? <Button name="View" /> : null}
      </Box>
    </Box>
  );
};

export default OnBording;
