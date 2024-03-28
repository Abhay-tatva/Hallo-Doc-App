import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "./createProvider.css";
import PhoneFormInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { FormInput } from "../../TextField/FormInput";
import { Button } from "../../Button/ButtonInput";
import { createProviderSchema } from "../../ValidationSchema";
import { useFormik } from "formik";

const initialValues = {
  userName: "",
  password: "",
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  administratorPhone: "",
  medicalLicense: "",
  npiNumber: "",
  selectedRegions: [],
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  mailingPhone: "",
  businessName: "",
  businessWebsite: "",
  adminNotes: "",
  IndConAgg: false,
  BacCheck: false,
  HIPAA: false,
  nonDisAgg: false,
};

const CreateProvider = () => {
  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: createProviderSchema,
  });

  return (
    <>
      <Box className="createprovider-main-container">
        <Container maxWidth="lg" className="createprovider-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Create Provider Account</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="createprovider-paper-container">
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h6">
                <b>Account Information</b>
              </Typography>
              <Grid container mt={5} spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="userName"
                    label="User Name(MD.Lastname.F)"
                    fullWidth
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.userName && Boolean(formik.errors.userName)
                    }
                    helperText={
                      formik.touched.userName && formik.errors.userName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    select
                    name="role"
                    label="Role"
                    fullWidth
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="masterAdmin">Master Admin</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="provider">Provider</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </FormInput>
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Administrator Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneFormInput
                    label="Phone Number"
                    name="administratorPhone"
                    country={"in"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.administratorPhone}
                    onChange={(value) =>
                      formik.setFieldValue("administratorPhone", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.administratorPhone &&
                      Boolean(formik.errors.administratorPhone)
                    }
                    helperText={
                      formik.touched.administratorPhone &&
                      formik.errors.administratorPhone
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="medicalLicense"
                    label="Medical License"
                    fullWidth
                    value={formik.values.medicalLicense}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.medicalLicense &&
                      Boolean(formik.errors.medicalLicense)
                    }
                    helperText={
                      formik.touched.medicalLicense &&
                      formik.errors.medicalLicense
                    }
                  ></FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="npiNumber"
                    label="NPI Number"
                    fullWidth
                    value={formik.values.npiNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.npiNumber &&
                      Boolean(formik.errors.npiNumber)
                    }
                    helperText={
                      formik.touched.npiNumber && formik.errors.npiNumber
                    }
                  ></FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  {regions.map((region, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox size="medium" value={region.region_name} />
                        }
                        label={region.region_name}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Mailing & Billing Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="address1"
                    label="Address 1"
                    fullWidth
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address1 && Boolean(formik.errors.address1)
                    }
                    helperText={
                      formik.touched.address1 && formik.errors.address1
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="address2"
                    label="Address 2"
                    fullWidth
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address2 && Boolean(formik.errors.address2)
                    }
                    helperText={
                      formik.touched.address2 && formik.errors.address2
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="state"
                    label="State"
                    select
                    fullWidth
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  >
                    {regions.map((region) => (
                      <MenuItem key={region.id} value={region.name}>
                        {region.name}
                      </MenuItem>
                    ))}
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="zip"
                    label="Zip"
                    fullWidth
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneFormInput
                    label="Phone Number"
                    name="mailingPhone"
                    country={"us"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values.mailingPhone}
                    onChange={(value) =>
                      formik.setFieldValue("mailingPhone", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mailingPhone &&
                      Boolean(formik.errors.mailingPhone)
                    }
                    helperText={
                      formik.touched.mailingPhone && formik.errors.mailingPhone
                    }
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" mt={4}>
                <b>Provider Profile</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="businessName"
                    label="Business name"
                    fullWidth
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessName &&
                      Boolean(formik.errors.businessName)
                    }
                    helperText={
                      formik.touched.businessName && formik.errors.businessName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="businessWebsite"
                    label="Business Website"
                    fullWidth
                    value={formik.values.businessWebsite}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessWebsite &&
                      Boolean(formik.errors.businessWebsite)
                    }
                    helperText={
                      formik.touched.businessWebsite &&
                      formik.errors.businessWebsite
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Box display="flex">
                      <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        title="Upload-files"
                      >
                        <input accept="image/*" type="file" />
                      </Button>

                      <Button
                        name="Upload"
                        variant="contained"
                        size="large"
                        startIcon={<CloudUploadOutlinedIcon />}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="adminNotes"
                    label="Admin Notes"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.adminNotes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.adminNotes &&
                      Boolean(formik.errors.adminNotes)
                    }
                    helperText={
                      formik.touched.adminNotes && formik.errors.adminNotes
                    }
                  />
                </Grid>
              </Grid>
              <Divider
                sx={{ backgroundColor: "#413f3f85", marginTop: "1.5rem" }}
              />
              <Typography variant="h6" mt={2} mb={2}>
                <b>Onboarding</b>
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={3}
              >
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="IndConAgg" />}
                    label="Independent Contractor Agreement"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="BacCheck" />}
                    label="Background Check"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="HIPAA" />}
                    label="HIPAA Compliance"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
                <Box display="flex" flexWrap="wrap" gap={65}>
                  <FormControlLabel
                    control={<Checkbox name="nonDisAgg" />}
                    label="Non-Disclosure Agreement"
                    sx={{ width: "310px" }}
                  />
                  <Button
                    name="Upload"
                    startIcon={<CloudUploadOutlinedIcon />}
                  />
                </Box>
              </Box>
              <Divider
                sx={{ backgroundColor: "#413f3f85", marginTop: "1.5rem" }}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button name="Create Account" color="success" type="submit" />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CreateProvider;
