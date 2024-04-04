import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";
import PhoneInput from "react-phone-input-2";

const Address = ({ add1, add2, city, state, zip, billNo }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const billformik = useFormik({
    initialValues: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
    },
    validationSchema: myProfileSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <form onSubmit={billformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Mailing & Billing Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="address1"
            label="Address 1"
            fullWidth
            className="form-input"
            value={add1}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="address2"
            label="Address 2"
            disabled={isDisabled}
            fullWidth
            value={add2}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="city"
            label="City"
            disabled={isDisabled}
            value={city}
            fullWidth
            className="form-input"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="state"
            label="State"
            disabled={isDisabled}
            value={state}
            fullWidth
            className="form-input"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="zip"
            label="Zip"
            disabled={isDisabled}
            fullWidth
            value={zip}
            className="form-input"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PhoneInput
            inputStyle={{ height: "55px", width: "100%" }}
            name="phoneNumber"
            country="in"
            disabled={isDisabled}
            value={billformik.values.phoneNumber}
            label="Phone Number"
            fullWidth="true"
            className="form-input"
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.phoneNumber &&
              Boolean(billformik.errors.phoneNumber)
            }
            helperText={
              billformik.touched.phoneNumber && billformik.errors.phoneNumber
            }
            onChange={(value) => billformik.setFieldValue("phoneNumber", value)}
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
              type="submit"
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

export default Address;
