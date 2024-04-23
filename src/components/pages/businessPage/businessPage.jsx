/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import "./businessPage.css";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

import { Button } from "../../Button/ButtonInput";
import { FormInput } from "../../TextField/FormInput";
import { useFormik } from "formik";
import { patientBusinessSchema } from "../../ValidationSchema";
import { postBusiness } from "../../../redux/patientSite/business/businessApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import PatientModal from "../../Modal/patientModal";

const BusinessPage = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const businessFormik = useFormik({
    initialValues: {
      businessFirstName: "",
      businessLastName: "",
      businessPhoneNumber: "",
      businessEmail: "",
      businessProperty: "",
      symptoms: "",
      patientFirstName: "",
      patientLastName: "",
      patientemail: "",
      patientPhoneNumber: "",
      date: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      room: "",
    },
    validationSchema: patientBusinessSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postBusiness({
          your_first_name: businessFormik.values.businessFirstName,
          your_last_name: businessFormik.values.businessLastName,
          your_mobile_no: businessFormik.values.businessPhoneNumber,
          your_email: businessFormik.values.businessEmail,
          your_property_name: businessFormik.values.businessProperty,
          symptoms: businessFormik.values.symptoms,
          firstname: businessFormik.values.patientFirstName,
          lastname: businessFormik.values.patientLastName,
          date_of_birth: businessFormik.values.date,
          email: businessFormik.values.patientemail,
          mobile_no: businessFormik.values.patientPhoneNumber,
          street: businessFormik.values.street,
          city: businessFormik.values.city,
          state: businessFormik.values.state,
          zip: businessFormik.values.zipCode,
          room: businessFormik.values.room,
        }),
      );
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <form onSubmit={businessFormik.handleSubmit}>
        <Box className="business-main-container">
          <Container maxWidth="md" className="business-main-wrapper">
            <Box display="flex" justifyContent="flex-end" mb="8px">
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                className="form-btn"
                onClick={() => navigate(-1)}
              />
            </Box>
            <Paper className="business-main-paper">
              <Typography variant="h5" gutterBottom>
                <b>Business Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessFirstName"
                    label="Your First Name"
                    fullWidth
                    value={businessFormik.values.businessFirstName}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.businessFirstName &&
                      Boolean(businessFormik.errors.businessFirstName)
                    }
                    helperText={
                      businessFormik.touched.businessFirstName &&
                      businessFormik.errors.businessFirstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessLastName"
                    label="Your Last Name"
                    fullWidth
                    value={businessFormik.values.businessLastName}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.businessLastName &&
                      Boolean(businessFormik.errors.businessLastName)
                    }
                    helperText={
                      businessFormik.touched.businessLastName &&
                      businessFormik.errors.businessLastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="businessPhoneNumber"
                    country="in"
                    label="Phone Number"
                    fullWidth="true"
                    value={businessFormik.values?.businessPhoneNumber?.toString()}
                    onChange={(value) =>
                      businessFormik.setFieldValue("businessPhoneNumber", value)
                    }
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.businessPhoneNumber &&
                      Boolean(businessFormik.errors.businessPhoneNumber)
                    }
                    helperText={
                      businessFormik.touched.businessPhoneNumber &&
                      businessFormik.errors.businessPhoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessEmail"
                    label="Email"
                    fullWidth
                    value={businessFormik.values.businessEmail}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.businessEmail &&
                      Boolean(businessFormik.errors.businessEmail)
                    }
                    helperText={
                      businessFormik.touched.businessEmail &&
                      businessFormik.errors.businessEmail
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessProperty"
                    label="Business/Property Name"
                    fullWidth
                    value={businessFormik.values.businessProperty}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.businessProperty &&
                      Boolean(businessFormik.errors.businessProperty)
                    }
                    helperText={
                      businessFormik.touched.businessProperty &&
                      businessFormik.errors.businessProperty
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="caseNumber"
                    label="Case Number (Optional)"
                    fullWidth
                    value={businessFormik.values.caseNumber}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.caseNumber &&
                      Boolean(businessFormik.errors.caseNumber)
                    }
                    helperText={
                      businessFormik.touched.caseNumber &&
                      businessFormik.errors.caseNumber
                    }
                  />
                </Grid>
              </Grid>

              {/* / ............................Patient Information........................ / */}

              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Information</b>
              </Typography>
              <FormInput
                name="symptoms"
                label="Enter Brief of Symptoms"
                multiline
                rows={4}
                fullWidth
                value={businessFormik.values.symptoms}
                onChange={businessFormik.handleChange}
                onBlur={businessFormik.handleBlur}
                error={
                  businessFormik.touched.symptoms &&
                  Boolean(businessFormik.errors.symptoms)
                }
                helperText={
                  businessFormik.touched.symptoms &&
                  businessFormik.errors.symptoms
                }
              />
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientFirstName"
                    label="First Name"
                    fullWidth
                    value={businessFormik.values.patientFirstName}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.patientFirstName &&
                      Boolean(businessFormik.errors.patientFirstName)
                    }
                    helperText={
                      businessFormik.touched.patientFirstName &&
                      businessFormik.errors.patientFirstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientLastName"
                    label="Last Name"
                    fullWidth
                    value={businessFormik.values.patientLastName}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.patientLastName &&
                      Boolean(businessFormik.errors.patientLastName)
                    }
                    helperText={
                      businessFormik.touched.patientLastName &&
                      businessFormik.errors.patientLastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    type="date"
                    fullWidth
                    name="date"
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    value={businessFormik.values.date}
                    error={
                      businessFormik.touched.date &&
                      Boolean(businessFormik.errors.date)
                    }
                    helperText={
                      businessFormik.touched.date && businessFormik.errors.date
                    }
                  />
                </Grid>
              </Grid>
              {/* ...............................Patient Contact Information.................. */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Contact Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientemail"
                    label="Email"
                    fullWidth
                    value={businessFormik.values.patientemail}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.patientemail &&
                      Boolean(businessFormik.errors.patientemail)
                    }
                    helperText={
                      businessFormik.touched.patientemail &&
                      businessFormik.errors.patientemail
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="patientPhoneNumber"
                    country="in"
                    label="Phone Number"
                    fullWidth="true"
                    value={businessFormik.values?.patientPhoneNumber?.toString()}
                    onChange={(value) =>
                      businessFormik.setFieldValue("patientPhoneNumber", value)
                    }
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.patientPhoneNumber &&
                      Boolean(businessFormik.errors.patientPhoneNumber)
                    }
                    helperText={
                      businessFormik.touched.patientPhoneNumber &&
                      businessFormik.errors.patientPhoneNumber
                    }
                  />
                </Grid>
              </Grid>
              {/* ..........................Patient Location...................... */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Location</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="street"
                    label="street"
                    fullWidth
                    value={businessFormik.values.street}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.street &&
                      Boolean(businessFormik.errors.street)
                    }
                    helperText={
                      businessFormik.touched.street &&
                      businessFormik.errors.street
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    value={businessFormik.values.city}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.city &&
                      Boolean(businessFormik.errors.city)
                    }
                    helperText={
                      businessFormik.touched.city && businessFormik.errors.city
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    value={businessFormik.values.state}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.state &&
                      Boolean(businessFormik.errors.state)
                    }
                    helperText={
                      businessFormik.touched.state &&
                      businessFormik.errors.state
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    value={businessFormik.values.zipCode}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.zipCode &&
                      Boolean(businessFormik.errors.zipCode)
                    }
                    helperText={
                      businessFormik.touched.zipCode &&
                      businessFormik.errors.zipCode
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="room"
                    label="Room #"
                    fullWidth
                    value={businessFormik.values.room}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.room &&
                      Boolean(businessFormik.errors.room)
                    }
                    helperText={
                      businessFormik.touched.room && businessFormik.errors.room
                    }
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                <Button name="Save" variant="contained" type="submit" />
                <Button name="Cancel" variant="outlined" />
              </Box>
            </Paper>
          </Container>
        </Box>
        <PatientModal open={open} handleClose={handleClose} />
      </form>
    </>
  );
};

export default BusinessPage;
