import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { FormInput } from "../../TextField/FormInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { submitSchema } from "../../ValidationSchema";
import "./meSubmitInformation.css";
import { useNavigate } from "react-router-dom";

const MeSubmitInformation = () => {
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();

  const submitFormik = useFormik({
    initialValues: {
      symptoms: "",
      submitFirstName: "",
      submitLastName: "",
      submitemail: "",
      submitPhoneNumber: "",
      date: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      room: "",
      file: null,
    },
    validationSchema: submitSchema,
    onSubmit: (values, onSubmitProps) => {
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <Box className="submit-main-container">
        <Container maxWidth="md" className="submit-main-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Typography variant="h5" gutterBottom>
              <b>Submit Information</b>
            </Typography>
            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              className="form-btn"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Paper className="submit-main-paper">
            {/* / ............................Patient Information........................ / */}
            <Typography variant="h5" gutterBottom mt={2}>
              <b>Patient Information</b>
            </Typography>
            <FormInput
              name="symptoms"
              label="Enter Brief of Symptoms"
              multiline
              rows={4}
              fullWidth
              value={submitFormik.values.symptoms}
              onChange={submitFormik.handleChange}
              onBlur={submitFormik.handleBlur}
              error={
                submitFormik.touched.symptoms &&
                Boolean(submitFormik.errors.symptoms)
              }
              helperText={
                submitFormik.touched.symptoms && submitFormik.errors.symptoms
              }
            />
            <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="submitFirstName"
                  label="First Name"
                  fullWidth
                  value={submitFormik.values.submitFirstName}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.submitFirstName &&
                    Boolean(submitFormik.errors.submitFirstName)
                  }
                  helperText={
                    submitFormik.touched.submitFirstName &&
                    submitFormik.errors.submitFirstName
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="submitLastName"
                  label="Last Name"
                  fullWidth
                  value={submitFormik.values.submitLastName}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.submitLastName &&
                    Boolean(submitFormik.errors.submitLastName)
                  }
                  helperText={
                    submitFormik.touched.submitLastName &&
                    submitFormik.errors.submitLastName
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  type="date"
                  name="date"
                  fullWidth
                  value={submitFormik.values.date}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.date &&
                    Boolean(submitFormik.errors.date)
                  }
                  helperText={
                    submitFormik.touched.date && submitFormik.errors.date
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
                  name="submitemail"
                  label="Email"
                  fullWidth
                  value={submitFormik.values.submitemail}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.submitemail &&
                    Boolean(submitFormik.errors.submitemail)
                  }
                  helperText={
                    submitFormik.touched.submitemail &&
                    submitFormik.errors.submitemail
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <PhoneInput
                  inputStyle={{ height: "55px", width: "100%" }}
                  name="submitPhoneNumber"
                  country="in"
                  label="Phone Number"
                  fullWidth="true"
                  value={submitFormik.values?.submitPhoneNumber?.toString()}
                  onChange={(value) =>
                    submitFormik.setFieldValue("submitPhoneNumber", value)
                  }
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.submitPhoneNumber &&
                    Boolean(submitFormik.errors.submitPhoneNumber)
                  }
                  helperText={
                    submitFormik.touched.submitPhoneNumber &&
                    submitFormik.errors.submitPhoneNumber
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
                  value={submitFormik.values.street}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.street &&
                    Boolean(submitFormik.errors.street)
                  }
                  helperText={
                    submitFormik.touched.street && submitFormik.errors.street
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="city"
                  label="City"
                  fullWidth
                  value={submitFormik.values.city}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.city &&
                    Boolean(submitFormik.errors.city)
                  }
                  helperText={
                    submitFormik.touched.city && submitFormik.errors.city
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="state"
                  label="State"
                  fullWidth
                  value={submitFormik.values.state}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.state &&
                    Boolean(submitFormik.errors.state)
                  }
                  helperText={
                    submitFormik.touched.state && submitFormik.errors.state
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="zipCode"
                  label="Zip Code"
                  fullWidth
                  value={submitFormik.values.zipCode}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.zipCode &&
                    Boolean(submitFormik.errors.zipCode)
                  }
                  helperText={
                    submitFormik.touched.zipCode && submitFormik.errors.zipCode
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  name="room"
                  label="Room #"
                  fullWidth
                  value={submitFormik.values.room}
                  onChange={submitFormik.handleChange}
                  onBlur={submitFormik.handleBlur}
                  error={
                    submitFormik.touched.room &&
                    Boolean(submitFormik.errors.room)
                  }
                  helperText={
                    submitFormik.touched.room && submitFormik.errors.room
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
              <Button name="Save" variant="contained" type="submit" />
              <Button name="Cancel" variant="outlined" />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MeSubmitInformation;
