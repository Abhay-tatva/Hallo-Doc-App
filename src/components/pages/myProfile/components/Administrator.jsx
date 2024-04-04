import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  confirmeMail: "",
  mobileNo: "",
};
const Administrator = ({ firstName, lastName, email, mobileNo, regions }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const data = useSelector((state) => state.root.regionPhysicianReducer);

  const administratorformik = useFormik({
    initialValues,
    validationSchema: myProfileSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    setInitialValues({
      firstName: firstName,
      lastName: lastName,
      email: email,
      confirmeMail: email,
      mobileNo: mobileNo,
    });
  }, [firstName, lastName, email, mobileNo]);
  return (
    <form onSubmit={administratorformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Administrator Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="firstName"
            label="First Name"
            fullWidth
            className="form-input"
            value={administratorformik.values.firstName}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="lastName"
            label="Last Name"
            fullWidth
            className="form-input"
            value={administratorformik.values.lastName}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="email"
            label="Email"
            fullWidth
            className="form-input"
            value={administratorformik.values.email}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="confirmeMail"
            label="Confirm Email"
            fullWidth
            className="form-input"
            value={administratorformik.values.confirmeMail}
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.confirmeMail &&
              Boolean(administratorformik.errors.confirmeMail)
            }
            helperText={
              administratorformik.touched.confirmeMail &&
              administratorformik.errors.confirmeMail
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
            name="mobileNo"
            country="in"
            label="Phone Number"
            fullWidth="true"
            className="form-input"
            onChange={(value) =>
              administratorformik.setFieldValue("mobileNo", value)
            }
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.mobileNo &&
              Boolean(administratorformik.errors.mobileNo)
            }
            helperText={
              administratorformik.touched.mobileNo &&
              administratorformik.errors.mobileNo
            }
            value={administratorformik.values?.mobileNo?.toString()}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {data.regions.map((region, index) => {
            const isChecked = regions?.some(
              (selectedRegion) =>
                selectedRegion.region_name === region.region_name,
            );
            return (
              <FormControlLabel
                className="checkbox-padding"
                disabled={isDisabled}
                key={index}
                control={<Checkbox size="small" checked={isChecked} />}
                label={region.region_name}
              />
            );
          })}
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
