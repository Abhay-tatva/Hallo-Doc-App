import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { Formik, useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";
import PhoneInput from "react-phone-input-2";

const Address = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const billformik = useFormik({
    initialValues: {
      address1: "tatva soft house",
      address2: "rajpathclub road",
      city: "dubai",
      state: "gujarat",
      zip: "nthi kbr",
      phoneNumber: "kale avjo",
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
            value={billformik.values.address1}
            disabled={isDisabled}
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.address1 && Boolean(billformik.errors.address1)
            }
            helperText={
              billformik.touched.address1 && billformik.errors.address1
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="address2"
            label="Address 2"
            disabled={isDisabled}
            fullWidth
            value={billformik.values.address2}
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.address2 && Boolean(billformik.errors.address2)
            }
            helperText={
              billformik.touched.address2 && billformik.errors.address2
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="city"
            label="City"
            disabled={isDisabled}
            value={billformik.values.city}
            fullWidth
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={billformik.touched.city && Boolean(billformik.errors.city)}
            helperText={billformik.touched.city && billformik.errors.city}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="state"
            label="State"
            disabled={isDisabled}
            value={billformik.values.state}
            fullWidth
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={billformik.touched.state && Boolean(billformik.errors.state)}
            helperText={billformik.touched.state && billformik.errors.state}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="zip"
            label="Zip"
            disabled={isDisabled}
            fullWidth
            value={billformik.values.zip}
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={billformik.touched.zip && Boolean(billformik.errors.zip)}
            helperText={billformik.touched.zip && billformik.errors.zip}
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
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.phoneNumber &&
              Boolean(billformik.errors.phoneNumber)
            }
            helperText={
              billformik.touched.phoneNumber && billformik.errors.phoneNumber
            }
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={4}>
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