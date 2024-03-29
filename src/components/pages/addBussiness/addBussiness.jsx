import React from "react";
import "./addBussiness.css";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { businessSchema } from "../../ValidationSchema";

const AddBussiness = () => {
  const navigate = useNavigate();
  const businessFormik = useFormik({
    initialValues: {
      businessName: "",
      profession: "",
      faxNumber: "",
      phoneNumber: "",
      email: "",
      bussinessContact: "",
      street: "",
      city: "",
      state: "",
      zipPostal: "",
    },
    validationSchema: businessSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <>
      <form>
        <Box className="bussiness-main-container">
          <Container className="bussiness-main-wrapper" maxwidth="md">
            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
            >
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h5" gutterBottom>
                  <b>Add Business</b>
                </Typography>
              </Box>
              <Button
                name="Back"
                variant="outlined"
                size="small"
                startIcon={<ArrowBackIosNewOutlinedIcon />}
                onClick={() => navigate(-1)}
              />
            </Box>
            <Paper className="bussiness-full-paper">
              <Typography variant="h6" className="account">
                <b>Submit information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessName"
                    label="Bussiness Name"
                    fullWidth
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    value={businessFormik.values.businessName}
                    error={
                      businessFormik.touched.businessName &&
                      Boolean(businessFormik.errors.businessName)
                    }
                    helperText={
                      businessFormik.touched.businessName &&
                      businessFormik.errors.businessName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="profession"
                    label="Profession"
                    fullWidth
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    value={businessFormik.values.profession}
                    error={
                      businessFormik.touched.profession &&
                      Boolean(businessFormik.errors.profession)
                    }
                    helperText={
                      businessFormik.touched.profession &&
                      businessFormik.errors.profession
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="faxNumber"
                    label="Fax Number"
                    fullWidth
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    value={businessFormik.values.faxNumber}
                    error={
                      businessFormik.touched.faxNumber &&
                      Boolean(businessFormik.errors.faxNumber)
                    }
                    helperText={
                      businessFormik.touched.faxNumber &&
                      businessFormik.errors.faxNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="phoneNumber"
                    country="us"
                    //   value={billformik.values.phoneNumber}
                    label="Phone Number"
                    //   fullWidth="true"
                    //   className="form-input"
                    //   onChange={billformik.handleChange}
                    //   onBlur={billformik.handleBlur}
                    //   error={
                    //     billformik.touched.phoneNumber &&
                    //     Boolean(billformik.errors.phoneNumber)
                    //   }
                    //   helperText={
                    //     billformik.touched.phoneNumber &&
                    //     billformik.errors.phoneNumber
                    //   }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput name="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="bussinessContact"
                    label="Bussiness Contact"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput name="Street" label="Street" fullWidth />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput name="City" label="City" fullWidth />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput name="State" label="State" fullWidth />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput name="zipPostal" label="Zip/Postal" fullWidth />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                <Button name="Save" variant="contained" type="submit" />
                <Button name="Cancel" variant="outlined" />
              </Box>
            </Paper>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default AddBussiness;
