/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./profile.css";
import { Button } from "../../Button/ButtonInput";
import { FormInput } from "../../TextField/FormInput";
import {
  putViewProfile,
  viewProfile,
} from "../../../redux/patientSite/patientDashboard/profileApi";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  date: "",
  email: "",
  phoneType: "",
  phoneNumber: toString(),
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

const Profile = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.root.viewProfileReducer);
  console.log("profile ", profileData);
  const formik = useFormik({ initialValues, enableReinitialize: true });

  useEffect(() => {
    setInitialValues({
      firstName: profileData?.general_information?.firstname,
      lastName: profileData?.general_information?.lastname,
      date: profileData?.general_information?.date_of_birth,
      email: profileData?.contact_information?.email,
      phoneType: profileData?.contact_information?.type,
      phoneNumber: profileData?.contact_information?.mobile_no,
      street: profileData?.location_information?.street,
      city: profileData?.location_information?.city,
      state: profileData?.location_information?.state,
      zipCode: profileData?.location_information?.zip,
    });
  }, [profileData]);

  const handleSave = () => {
    dispatch(
      putViewProfile({
        firstname: formik.values.firstName,
        lastname: formik.values.lastName,
        date_of_birth: formik.values.date,
        mobile_no: formik.values.phoneNumber.toString(),
        type: formik.values.phoneType,
        email: formik.values.email,
        street: formik.values.street,
        city: formik.values.city,
        state: formik.values.state,
        zip: formik.values.zipCode.toString(),
      }),
    ).then((response) => {
      if (response.type === "putViewProfile/fulfilled") {
        toast.success("Profile Update Successfuly...");
        dispatch(viewProfile());
        setIsDisable(true);
      }
    });
  };

  return (
    <>
      <Box className="profile-main-container">
        <Container className="profile-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Typography variant="h5">
              <b>User Profile</b>
            </Typography>
            <Button
              name="Back"
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="profile-main-paper">
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h5" pb={2}>
                <b>General Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="date"
                    label="Date Of Birth"
                    type="date"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.date && formik.errors.date}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Contact Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={4} md={2}>
                  <FormInput
                    name="phoneType"
                    label="Type"
                    fullWidth
                    disabled={isDisable}
                    select
                    value={formik.values.phoneType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.phoneType && formik.errors.phoneType
                    }
                    error={
                      formik.touched.phoneType &&
                      Boolean(formik.errors.phoneType)
                    }
                  >
                    <MenuItem value="mobile">Mobile</MenuItem>
                    <MenuItem value="Mobile">Mobile</MenuItem>
                    <MenuItem value="Landline">LendLine</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={8} md={4}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="phoneNumber"
                    country="in"
                    label="Phone Number"
                    fullWidth="true"
                    value={formik.values?.phoneNumber?.toString()}
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
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5" pb={2} pt={3}>
                <b>Location Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="street"
                    label="Street"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.street && formik.errors.street}
                    error={
                      formik.touched.street && Boolean(formik.errors.street)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.city && formik.errors.city}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.state && formik.errors.state}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    disabled={isDisable}
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                    error={
                      formik.touched.zipCode && Boolean(formik.errors.zipCode)
                    }
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                pt={2}
              >
                {isDisable ? (
                  <Button name="Edit" onClick={() => setIsDisable(false)} />
                ) : (
                  <>
                    <Button name="Save" onClick={handleSave} />
                    <Button
                      name="Cancel"
                      variant="outlined"
                      onClick={() => {
                        formik.setValues(initialValues);
                        setIsDisable(true);
                      }}
                    />
                  </>
                )}
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
