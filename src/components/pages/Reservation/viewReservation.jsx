import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import * as Yup from "yup";

import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import "./viewReservation.css";
import { Button } from "../../Button/ButtonInput";
import { FormInput } from "../../TextField/FormInput";
import "./viewReservation.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constant/route";
import Header from "../../Header/Header";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  patientNotes: Yup.string().required("Username is required"),
  firstName: Yup.string().required("Password is required"),
});

const ViewReservation = () => {
  const formik = useFormik({
    initialValues: {
      patientNotes: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      email: "",
      region: "",
      business: "",
      room: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <>
      <Header />
      <Box className="main-container">
        <Container maxWidth="md" className="container-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>View Reservation</b>
              </Typography>
              <span className="patient-btn">Patient</span>
            </Box>
            <Link to={AppRoutes.DASHBOARD}>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                className="form-btn"
              />
            </Link>
          </Box>

          <Paper className="full-paper">
            <Typography variant="h6">
              <b>Patient Information</b>
            </Typography>
            <Box className="conformation-number">
              <Typography variant="caption" display="block">
                Conformation Number
              </Typography>
              <Typography variant="subtitle1" color="#39B3C3">
                <b>MD200224MOAB0002</b>
              </Typography>
            </Box>
            <FormInput
              name="patientNotes"
              label="Patient Notes"
              multiline
              rows={4}
              maxRows={4}
              fullWidth
              className="form-input, text-area"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.patientNotes}
              error={
                formik.touched.patientNotes &&
                Boolean(formik.errors.patientNotes)
              }
            />
            {/* <Divider /> */}
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              margin="2rem"
              className="divider"
            >
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="firstName"
                  label="First Name"
                  fullWidth
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput type="date" fullWidth className="form-input" />
              </Grid>
              <Grid item sm={12} md={5} lg={5}>
                <Box display="flex" alignItems="center" className="form-input1">
                  <FormInput
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                  />
                </Box>
              </Grid>
              <Grid item sm={12} md={1} lg={1}>
                <Button variant="outlined" size="large" className="phonebtn">
                  <PhoneIcon />
                </Button>
              </Grid>
              <Grid item sm={12} md={6} lg={6}>
                <FormInput
                  name="email"
                  label="Email"
                  fullWidth
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
              </Grid>
              <Grid item sm={12} md={6} lg={6}>
                <Button
                  variant="outlined"
                  name="Edit"
                  color="primary"
                  //   startIcon={<EditIcon />}
                  size="large"
                  className="form-btn editbtn"
                />
              </Grid>
            </Grid>

            <Typography variant="h6">
              <b>Location Information</b>
            </Typography>
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              className="location-info"
            >
              <Grid item xs={12} md={6}>
                <FormInput
                  name="region"
                  className="form-input"
                  label="Region"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.region}
                  error={formik.touched.region && Boolean(formik.errors.region)}
                />
              </Grid>
              <Grid item xs={11} md={5}>
                <FormInput
                  name="business"
                  className="form-input"
                  label="Business Name/Address"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.business}
                  error={
                    formik.touched.business && Boolean(formik.errors.business)
                  }
                />
              </Grid>
              <Grid item xs={1} md={1}>
                <Button
                  variant="outlined"
                  size="small"
                  className="form-btn locationbtn"
                >
                  <IconButton size="small">
                    <LocationOnOutlinedIcon />
                  </IconButton>
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormInput
                  name="room"
                  label="Room #"
                  className="form-input"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.room}
                  error={formik.touched.room && Boolean(formik.errors.room)}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="flex-end"
              mt={4}
              className="end-btn"
            >
              <Link to={AppRoutes.DASHBOARD}>
                <Button
                  name="Back"
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowBackIosOutlinedIcon />}
                  className="form-btn backbtn"
                />
              </Link>
              <Button
                name="View Notes"
                variant="contained"
                // color="primary"
                //   startIcon={<NoteIcon />}
                className="form-btn viewbtn"
              />
              <Button
                name="Cancle"
                variant="contained"
                color="error"
                className="form-btn"
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ViewReservation;