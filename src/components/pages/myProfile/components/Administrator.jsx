import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";
import PhoneInput from "react-phone-input-2";

const Administrator = ({
  firstName,
  lirstName,
  Email,
  mobileNo,
  districtColumbia,
  newYyork,
  Virginia,
  Maryland,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const administratorformik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      confirmemail: "",
      phoneNumber: "",
    },
    validationSchema: myProfileSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <form onSubmit={administratorformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Administrator Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="firstname"
            label="First Name"
            fullWidth
            className="form-input"
            value={firstName}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="lastname"
            label="Last Name"
            fullWidth
            className="form-input"
            value={lirstName}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="email"
            label="Email"
            fullWidth
            className="form-input"
            value={Email}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="confirmemail"
            label="Confirm Email"
            fullWidth
            className="form-input"
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.confirmemail &&
              Boolean(administratorformik.errors.confirmemail)
            }
            helperText={
              administratorformik.touched.confirmemail &&
              administratorformik.errors.confirmemail
            }
            disabled={isDisabled}
          >
            <MenuItem value="masteradmin">Master Admin</MenuItem>
            <MenuItem value="localadmin">Local Admin</MenuItem>
          </FormInput>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PhoneInput
            inputStyle={{ height: "55px", width: "100%" }}
            name="phoneNumber"
            country="in"
            label="Phone Number"
            fullWidth="true"
            className="form-input"
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.confirmemail &&
              Boolean(administratorformik.errors.phoneNumber)
            }
            helperText={
              administratorformik.touched.phoneNumber &&
              administratorformik.errors.confirmemail
            }
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Label"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Required"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Required"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Required"
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
        {isDisabled ? (
          <Button
            name="Edit"
            variant="contained"
            color="primary"
            onClick={() => {
              setIsDisabled(false);
            }}
          />
        ) : (
          <>
            <Button
              name="Save"
              variant="contained"
              onClick={() => {
                setIsDisabled(true);
              }}
            />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                setIsDisabled(true);
              }}
            />
          </>
        )}
      </Box>
    </form>
  );
};

export default Administrator;
