/* eslint-disable camelcase */

import React from "react";
import "./createRequest.css";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Button } from "../../Button/ButtonInput";
import { AppRoutes } from "../../../constant/route";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import PhoneInput from "react-phone-input-2";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useFormik } from "formik";
import { createRequestSchema } from "../../ValidationSchema/createRequestSchema";
import { useDispatch } from "react-redux";
import {
  createRequest,
  createRequestVerify,
} from "../../../redux/createRequest/createRequestApi";
import { toast } from "react-toastify";
const CreateRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      room: "",
      notes: "",
    },
    validationSchema: createRequestSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        createRequest({
          firstname: formik.values.firstName,
          lastname: formik.values.lastName,
          phone_number: formik.values.phoneNumber,
          email: formik.values.email,
          DOB: formik.values.dateOfBirth,
          street: formik.values.street,
          city: formik.values.city,
          state: formik.values.state,
          zip: formik.values.zipCode,
          room: formik.values.room,
          admin_notes: formik.values.notes,
        }),
      ).then((response) => {
        if (response.type === "createRequest/fulfilled")
          navigate(AppRoutes.DASHBOARD);
      });
      onSubmitProps.resetForm();
    },
  });
  console.log("formik", formik);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box className="request-main-container">
          <Container maxWidth="lg" className="request-main-container">
            <Box display="flex" justifyContent="space-between" mb="8px">
              <Box display="flex">
                <Typography variant="h5" gutterBottom>
                  <b>Submit Informtion</b>
                </Typography>
              </Box>

              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                className="form-btn"
                onClick={() => navigate(AppRoutes.DASHBOARD)}
              />
            </Box>
            <Paper className="request-full-paper">
              <Typography variant="h6" className="account">
                <b>Patient</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="phoneNumber"
                    country="us"
                    // disabled={isDisabled}
                    value={formik.values.phoneNumber}
                    label="Phone Number"
                    fullWidth="true"
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="dateOfBirth"
                    fullWidth
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                    error={
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth)
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                  />
                </Grid>
              </Grid>

              {/* /......................................Location.................................../ */}
              <Typography variant="h6">
                <b>Location</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="street"
                    label="Street"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.street}
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
                    helperText={formik.touched.street && formik.errors.street}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zipCode}
                    error={
                      formik.touched.zipCode && Boolean(formik.errors.zipCode)
                    }
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="room"
                    label="Room #"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.room}
                    error={formik.touched.room && Boolean(formik.errors.room)}
                    helperText={formik.touched.room && formik.errors.room}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box display="flex" gap={2}>
                    <Button
                      name="verify"
                      variant="outlined"
                      size="large"
                      onClick={() =>
                        dispatch(createRequestVerify(formik.values.state)).then(
                          (response) => {
                            if (
                              response.type === "createRequestVerify/fulfilled"
                            ) {
                              toast.success("state verified successfully.");
                            } else {
                              formik.setErrors({ state: "invalid state" });
                            }
                          },
                        )
                      }
                    />
                    <Button name="map" variant="outlined" size="large">
                      <LocationOnOutlinedIcon />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              {/* .............................................Notes.................................... */}
              <Typography variant="h6">
                <b>Notes</b>
              </Typography>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="notes"
                  label="Notes"
                  fullWidth
                  multiline
                  rows={6}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.notes}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                mt={4}
                className="end-btn"
              >
                <Button name=" Save" variant="contained" type="submit" />
                <Button name="Cancel" variant="outlined" />
              </Box>
            </Paper>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default CreateRequest;
