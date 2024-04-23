/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import "./familyFriend.css";
import { FormInput } from "../../TextField/FormInput";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Button } from "../../Button/ButtonInput";
import { useFormik } from "formik";
import { familySchema } from "../../ValidationSchema";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postFamilyFriend } from "../../../redux/patientSite/familyFriend/familyFriendApi";
import PatientModal from "../../Modal/patientModal";

const FamilyFriend = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const familyFormik = useFormik({
    initialValues: {
      familyFirstName: "",
      familyLastName: "",
      familyPhoneNumber: "",
      familyEmail: "",
      familyrelation: "",
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
      file: null,
    },
    validationSchema: familySchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postFamilyFriend({
          your_first_name: familyFormik.values.familyFirstName,
          your_last_name: familyFormik.values.familyLastName,
          your_mobile_no: familyFormik.values.familyPhoneNumber,
          your_email: familyFormik.values.familyEmail,
          your_relation_with_patient: familyFormik.values.familyrelation,
          symptoms: familyFormik.values.symptoms,
          firstname: familyFormik.values.patientFirstName,
          lastname: familyFormik.values.patientFirstName,
          date_of_birth: familyFormik.values.date,
          email: familyFormik.values.patientemail,
          mobile_no: familyFormik.values.patientPhoneNumber,
          street: familyFormik.values.street,
          city: familyFormik.values.city,
          state: familyFormik.values.state,
          zip: familyFormik.values.zipCode,
          room: familyFormik.values.room,
          file: familyFormik.values.file,
        }),
      );
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <form onSubmit={familyFormik.handleSubmit}>
        <Box className="familyfreind-main-container">
          <Container maxWidth="md" className="family-main-wrapper">
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
            <Paper className="family-main-paper">
              <Typography variant="h5" gutterBottom>
                <b>Family/Friend Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="familyFirstName"
                    label="Your First Name"
                    fullWidth
                    value={familyFormik.values.familyFirstName}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.familyFirstName &&
                      Boolean(familyFormik.errors.familyFirstName)
                    }
                    helperText={
                      familyFormik.touched.familyFirstName &&
                      familyFormik.errors.familyFirstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="familyLastName"
                    label="Your Last Name"
                    fullWidth
                    value={familyFormik.values.familyLastName}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.familyLastName &&
                      Boolean(familyFormik.errors.familyLastName)
                    }
                    helperText={
                      familyFormik.touched.familyLastName &&
                      familyFormik.errors.familyLastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="familyPhoneNumber"
                    country="in"
                    label="Phone Number"
                    fullWidth="true"
                    value={familyFormik.values?.familyPhoneNumber?.toString()}
                    onChange={(value) =>
                      familyFormik.setFieldValue("familyPhoneNumber", value)
                    }
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.familyPhoneNumber &&
                      Boolean(familyFormik.errors.familyPhoneNumber)
                    }
                    helperText={
                      familyFormik.touched.familyPhoneNumber &&
                      familyFormik.errors.familyPhoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="familyEmail"
                    label="Email"
                    fullWidth
                    value={familyFormik.values.familyEmail}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.familyEmail &&
                      Boolean(familyFormik.errors.familyEmail)
                    }
                    helperText={
                      familyFormik.touched.familyEmail &&
                      familyFormik.errors.familyEmail
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="familyrelation"
                    label="Relation With Patient"
                    fullWidth
                    value={familyFormik.values.familyrelation}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.familyrelation &&
                      Boolean(familyFormik.errors.familyrelation)
                    }
                    helperText={
                      familyFormik.touched.familyrelation &&
                      familyFormik.errors.familyrelation
                    }
                  />
                </Grid>
              </Grid>
              {/* / ............................Patient Information........................ / */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Information</b>
              </Typography>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="symptoms"
                  label="Enter Brief of Symptoms"
                  multiline
                  rows={4}
                  fullWidth
                  value={familyFormik.values.symptoms}
                  onChange={familyFormik.handleChange}
                  onBlur={familyFormik.handleBlur}
                  error={
                    familyFormik.touched.symptoms &&
                    Boolean(familyFormik.errors.symptoms)
                  }
                  helperText={
                    familyFormik.touched.symptoms &&
                    familyFormik.errors.symptoms
                  }
                />
              </Grid>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientFirstName"
                    label="First Name"
                    fullWidth
                    value={familyFormik.values.patientFirstName}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.patientFirstName &&
                      Boolean(familyFormik.errors.patientFirstName)
                    }
                    helperText={
                      familyFormik.touched.patientFirstName &&
                      familyFormik.errors.patientFirstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="patientLastName"
                    label="Last Name"
                    fullWidth
                    value={familyFormik.values.patientLastName}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.patientLastName &&
                      Boolean(familyFormik.errors.patientLastName)
                    }
                    helperText={
                      familyFormik.touched.patientLastName &&
                      familyFormik.errors.patientLastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    type="date"
                    fullWidth
                    name="date"
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    value={familyFormik.values.date}
                    error={
                      familyFormik.touched.date &&
                      Boolean(familyFormik.errors.date)
                    }
                    helperText={
                      familyFormik.touched.date && familyFormik.errors.date
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
                    value={familyFormik.values.patientemail}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.patientemail &&
                      Boolean(familyFormik.errors.patientemail)
                    }
                    helperText={
                      familyFormik.touched.patientemail &&
                      familyFormik.errors.patientemail
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
                    value={familyFormik.values?.patientPhoneNumber?.toString()}
                    onChange={(value) =>
                      familyFormik.setFieldValue("patientPhoneNumber", value)
                    }
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.patientPhoneNumber &&
                      Boolean(familyFormik.errors.patientPhoneNumber)
                    }
                    helperText={
                      familyFormik.touched.patientPhoneNumber &&
                      familyFormik.errors.patientPhoneNumber
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
                    name="street"
                    label="street"
                    fullWidth
                    value={familyFormik.values.street}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.street &&
                      Boolean(familyFormik.errors.street)
                    }
                    helperText={
                      familyFormik.touched.street && familyFormik.errors.street
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    value={familyFormik.values.city}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.city &&
                      Boolean(familyFormik.errors.city)
                    }
                    helperText={
                      familyFormik.touched.city && familyFormik.errors.city
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    value={familyFormik.values.state}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.state &&
                      Boolean(familyFormik.errors.state)
                    }
                    helperText={
                      familyFormik.touched.state && familyFormik.errors.state
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    value={familyFormik.values.zipCode}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.zipCode &&
                      Boolean(familyFormik.errors.zipCode)
                    }
                    helperText={
                      familyFormik.touched.zipCode &&
                      familyFormik.errors.zipCode
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="room"
                    label="Room #"
                    fullWidth
                    value={familyFormik.values.room}
                    onChange={familyFormik.handleChange}
                    onBlur={familyFormik.handleBlur}
                    error={
                      familyFormik.touched.room &&
                      Boolean(familyFormik.errors.room)
                    }
                    helperText={
                      familyFormik.touched.room && familyFormik.errors.room
                    }
                  />
                </Grid>
              </Grid>
              {/* .......................Upload Photo or Document............. */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>(Optional) Upload Photo or Document</b>
              </Typography>
              <Box display="flex" position="relative" mb={2} mt={2}>
                <Button
                  style={{
                    color: "#000000",
                    display: "flex",
                    justifyContent: "flex-start",
                    backgroundColor: "#f6f6f6",
                  }}
                  fullWidth
                  variant="outlined"
                  component="label"
                  title="Upload-files"
                >
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setSelectedFile(e.target.files[0]);
                    }}
                    type="file"
                  />
                  <label htmlFor="selectFile">
                    {selectedFile !== null ? selectedFile?.name : "Select File"}
                  </label>
                </Button>
                <Button
                  name="Upload"
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadOutlinedIcon />}
                  type="submit"
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                <Button name="submit" variant="contained" type="submit" />
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

export default FamilyFriend;
