/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import "./conciergePage.css";
import { useFormik } from "formik";
import { conciergeSchema } from "../../ValidationSchema";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Button } from "../../Button/ButtonInput";
import { FormInput } from "../../TextField/FormInput";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { postConcierge } from "../../../redux/patientSite/concierge/conciergeApi";
import { useNavigate } from "react-router-dom";
import PatientModal from "../../Modal/patientModal";

const ConciergePage = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const conciergeFormik = useFormik({
    initialValues: {
      conciergeFirstName: "",
      conciergeLastName: "",
      conciergePhoneNumber: "",
      conciergeEmail: "",
      conciergeProperty: "",
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
    validationSchema: conciergeSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postConcierge({
          your_first_name: conciergeFormik.values.conciergeFirstName,
          your_last_name: conciergeFormik.values.conciergeLastName,
          your_mobile_no: conciergeFormik.values.conciergePhoneNumber,
          your_email: conciergeFormik.values.conciergeEmail,
          your_house_name: conciergeFormik.values.conciergeProperty,
          symptoms: conciergeFormik.values.symptoms,
          firstname: conciergeFormik.values.patientFirstName,
          lastname: conciergeFormik.values.patientFirstName,
          date_of_birth: conciergeFormik.values.date,
          email: conciergeFormik.values.patientemail,
          mobile_no: conciergeFormik.values.patientPhoneNumber,
          your_street: conciergeFormik.values.street,
          your_city: conciergeFormik.values.city,
          your_state: conciergeFormik.values.state,
          your_zip: conciergeFormik.values.zipCode,
          room: conciergeFormik.values.room,
        }),
      );
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <form onSubmit={conciergeFormik.handleSubmit}>
        <Box className="concierge-main-container">
          <Container maxWidth="md" className="concierge-main-wrapper">
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
            <Paper className="concierge-main-paper">
              <Typography variant="h5" gutterBottom>
                <b>Concierge Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="conciergeFirstName"
                    label="Your First Name"
                    fullWidth
                    value={conciergeFormik.values.conciergeFirstName}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.conciergeFirstName &&
                      Boolean(conciergeFormik.errors.conciergeFirstName)
                    }
                    helperText={
                      conciergeFormik.touched.conciergeFirstName &&
                      conciergeFormik.errors.conciergeFirstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="conciergeLastName"
                    label="Your Last Name"
                    fullWidth
                    value={conciergeFormik.values.conciergeLastName}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.conciergeLastName &&
                      Boolean(conciergeFormik.errors.conciergeLastName)
                    }
                    helperText={
                      conciergeFormik.touched.conciergeLastName &&
                      conciergeFormik.errors.conciergeLastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="conciergePhoneNumber"
                    country="in"
                    label="Phone Number"
                    fullWidth="true"
                    value={conciergeFormik.values?.conciergePhoneNumber?.toString()}
                    onChange={(value) =>
                      conciergeFormik.setFieldValue(
                        "conciergePhoneNumber",
                        value,
                      )
                    }
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.conciergePhoneNumber &&
                      Boolean(conciergeFormik.errors.conciergePhoneNumber)
                    }
                    helperText={
                      conciergeFormik.touched.conciergePhoneNumber &&
                      conciergeFormik.errors.conciergePhoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="conciergeEmail"
                    label="Email"
                    fullWidth
                    value={conciergeFormik.values.conciergeEmail}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.conciergeEmail &&
                      Boolean(conciergeFormik.errors.conciergeEmail)
                    }
                    helperText={
                      conciergeFormik.touched.conciergeEmail &&
                      conciergeFormik.errors.conciergeEmail
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="conciergeProperty"
                    label="Relation With Patient"
                    fullWidth
                    value={conciergeFormik.values.conciergeProperty}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.conciergeProperty &&
                      Boolean(conciergeFormik.errors.conciergeProperty)
                    }
                    helperText={
                      conciergeFormik.touched.conciergeProperty &&
                      conciergeFormik.errors.conciergeProperty
                    }
                  />
                </Grid>
              </Grid>
              {/* / ................................Concierge location......................... / */}
              <Typography variant="h5" gutterBottom>
                <b>Concierge Location</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="street"
                    label="Street"
                    fullWidth
                    value={conciergeFormik.values.street}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.street &&
                      Boolean(conciergeFormik.errors.street)
                    }
                    helperText={
                      conciergeFormik.touched.street &&
                      conciergeFormik.errors.street
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    value={conciergeFormik.values.city}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.city &&
                      Boolean(conciergeFormik.errors.city)
                    }
                    helperText={
                      conciergeFormik.touched.city &&
                      conciergeFormik.errors.city
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    value={conciergeFormik.values.state}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.state &&
                      Boolean(conciergeFormik.errors.state)
                    }
                    helperText={
                      conciergeFormik.touched.state &&
                      conciergeFormik.errors.state
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="zipCode"
                    label="ZipCode"
                    fullWidth
                    value={conciergeFormik.values.zipCode}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.zipCode &&
                      Boolean(conciergeFormik.errors.zipCode)
                    }
                    helperText={
                      conciergeFormik.touched.zipCode &&
                      conciergeFormik.errors.zipCode
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
                value={conciergeFormik.values.symptoms}
                onChange={conciergeFormik.handleChange}
                onBlur={conciergeFormik.handleBlur}
                error={
                  conciergeFormik.touched.symptoms &&
                  Boolean(conciergeFormik.errors.symptoms)
                }
                helperText={
                  conciergeFormik.touched.symptoms &&
                  conciergeFormik.errors.symptoms
                }
              />
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientFirstName"
                    label="First Name"
                    fullWidth
                    value={conciergeFormik.values.patientFirstName}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.patientFirstName &&
                      Boolean(conciergeFormik.errors.patientFirstName)
                    }
                    helperText={
                      conciergeFormik.touched.patientFirstName &&
                      conciergeFormik.errors.patientFirstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientLastName"
                    label="Last Name"
                    fullWidth
                    value={conciergeFormik.values.patientLastName}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.patientLastName &&
                      Boolean(conciergeFormik.errors.patientLastName)
                    }
                    helperText={
                      conciergeFormik.touched.patientLastName &&
                      conciergeFormik.errors.patientLastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    type="date"
                    fullWidth
                    name="date"
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    value={conciergeFormik.values.date}
                    error={
                      conciergeFormik.touched.date &&
                      Boolean(conciergeFormik.errors.date)
                    }
                    helperText={
                      conciergeFormik.touched.date &&
                      conciergeFormik.errors.date
                    }
                  />
                </Grid>
              </Grid>
              {/* ...............................Patient ContactInformation.................. */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Contact Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientemail"
                    label="Email"
                    fullWidth
                    value={conciergeFormik.values.patientemail}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.patientemail &&
                      Boolean(conciergeFormik.errors.patientemail)
                    }
                    helperText={
                      conciergeFormik.touched.patientemail &&
                      conciergeFormik.errors.patientemail
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
                    value={conciergeFormik.values?.patientPhoneNumber?.toString()}
                    onChange={(value) =>
                      conciergeFormik.setFieldValue("patientPhoneNumber", value)
                    }
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.patientPhoneNumber &&
                      Boolean(conciergeFormik.errors.patientPhoneNumber)
                    }
                    helperText={
                      conciergeFormik.touched.patientPhoneNumber &&
                      conciergeFormik.errors.patientPhoneNumber
                    }
                  />
                </Grid>
              </Grid>
              {/* ..........................Patient Location.................. */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Location</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="room"
                    label="Room #"
                    fullWidth
                    value={conciergeFormik.values.room}
                    onChange={conciergeFormik.handleChange}
                    onBlur={conciergeFormik.handleBlur}
                    error={
                      conciergeFormik.touched.room &&
                      Boolean(conciergeFormik.errors.room)
                    }
                    helperText={
                      conciergeFormik.touched.room &&
                      conciergeFormik.errors.room
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

export default ConciergePage;
