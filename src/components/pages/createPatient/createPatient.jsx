/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { FormInput } from "../../TextField/FormInput";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { patientSchema } from "../../ValidationSchema";
import "./createPatient.css";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useDispatch } from "react-redux";
import {
  isPatientRegister,
  postCreatePatient,
} from "../../../redux/patientSite/patientRegister/patientRegisterApi";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const debounceCall = debounce(async (email, setFieldValue, dispatch) => {
  try {
    const response = await dispatch(isPatientRegister({ email }));
    if (response.type === "isPatientRegister/fulfilled") {
      setFieldValue("status", response.payload?.data);
    }
  } catch (error) {
    toast.error("Failed to check email:", error);
  }
}, 1000);

export const CreatePatient = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patientformik = useFormik({
    initialValues: {
      symptoms: "",
      firstName: "",
      lastName: "",
      date: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      street: "",
      status: true,
      city: "",
      state: "",
      zipCode: "",
      room: "",
      file: null,
    },
    validationSchema: patientSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postCreatePatient({
          symptoms: patientformik.values.symptoms,
          firstname: patientformik.values.firstName,
          lastname: patientformik.values.lastName,
          date_of_birth: patientformik.values.date,
          email: patientformik.values.email,
          mobile_no: patientformik.values.phoneNumber,
          street: patientformik.values.street,
          city: patientformik.values.city,
          state: patientformik.values.state,
          zip: patientformik.values.zipCode,
          room: patientformik.values.room,
          file: patientformik.values.file,
        }),
      );
      onSubmitProps.resetForm();
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (patientformik.values.email) {
      debounceCall(
        patientformik.values.email,
        patientformik.setFieldValue,
        dispatch,
      );
    }
    return () => {
      debounceCall.cancel();
    };
  }, [dispatch, patientformik.setFieldValue, patientformik.values.email]);
  return (
    <>
      <form onSubmit={patientformik.handleSubmit}>
        <Box className="createPatient-main-container">
          <Container maxWidth="md" className="createPatient-main-wrapper">
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
            <Paper className="patient-main-paper">
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Information</b>
              </Typography>
              <FormInput
                name="symptoms"
                label="Enter Brief of Symptoms"
                multiline
                rows={4}
                fullWidth
                value={patientformik.values.symptoms}
                onChange={patientformik.handleChange}
                onBlur={patientformik.handleBlur}
                error={
                  patientformik.touched.symptoms &&
                  Boolean(patientformik.errors.symptoms)
                }
                helperText={
                  patientformik.touched.symptoms &&
                  patientformik.errors.symptoms
                }
              />
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={patientformik.values.firstName}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.firstName &&
                      Boolean(patientformik.errors.firstName)
                    }
                    helperText={
                      patientformik.touched.firstName &&
                      patientformik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={patientformik.values.lastName}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.lastName &&
                      Boolean(patientformik.errors.lastName)
                    }
                    helperText={
                      patientformik.touched.lastName &&
                      patientformik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    type="date"
                    fullWidth
                    name="date"
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    value={patientformik.values.date}
                    error={
                      patientformik.touched.date &&
                      Boolean(patientformik.errors.date)
                    }
                    helperText={
                      patientformik.touched.date && patientformik.errors.date
                    }
                  />
                </Grid>
              </Grid>
              {/* ...............................Patient Contact */}
              {/* Information.................. */}
              <Typography variant="h5" gutterBottom mt={3}>
                <b>Patient Contact Information</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    value={patientformik.values.email}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.email &&
                      Boolean(patientformik.errors.email)
                    }
                    helperText={
                      patientformik.touched.email && patientformik.errors.email
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="phoneNumber"
                    country="in"
                    label="Phone Number"
                    fullWidth="true"
                    value={patientformik.values?.phoneNumber?.toString()}
                    onChange={(value) =>
                      patientformik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.phoneNumber &&
                      Boolean(patientformik.errors.phoneNumber)
                    }
                    helperText={
                      patientformik.touched.phoneNumber &&
                      patientformik.errors.phoneNumber
                    }
                  />
                </Grid>
                {!patientformik.values.status ? (
                  <>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormInput
                        name="password"
                        label="New Password"
                        value={patientformik.values.password}
                        onChange={patientformik.handleChange}
                        onBlur={patientformik.handleBlur}
                        helperText={
                          patientformik.touched.password &&
                          patientformik.errors.password
                        }
                        error={
                          patientformik.touched.password &&
                          Boolean(patientformik.errors.password)
                        }
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffOutlinedIcon />
                                ) : (
                                  <VisibilityOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormInput
                        name="confirmPassword"
                        label="Confirm Password"
                        value={patientformik.values.confirmPassword}
                        onChange={patientformik.handleChange}
                        onBlur={patientformik.handleBlur}
                        helperText={
                          patientformik.touched.confirmPassword &&
                          patientformik.errors.confirmPassword
                        }
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        error={
                          patientformik.touched.confirmPassword &&
                          Boolean(patientformik.errors.confirmPassword)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffOutlinedIcon />
                                ) : (
                                  <VisibilityOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                      />
                    </Grid>
                  </>
                ) : null}
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
                    value={patientformik.values.street}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.street &&
                      Boolean(patientformik.errors.street)
                    }
                    helperText={
                      patientformik.touched.street &&
                      patientformik.errors.street
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    value={patientformik.values.city}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.city &&
                      Boolean(patientformik.errors.city)
                    }
                    helperText={
                      patientformik.touched.city && patientformik.errors.city
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    value={patientformik.values.state}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.state &&
                      Boolean(patientformik.errors.state)
                    }
                    helperText={
                      patientformik.touched.state && patientformik.errors.state
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    value={patientformik.values.zipCode}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.zipCode &&
                      Boolean(patientformik.errors.zipCode)
                    }
                    helperText={
                      patientformik.touched.zipCode &&
                      patientformik.errors.zipCode
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="room"
                    label="Room #"
                    fullWidth
                    value={patientformik.values.room}
                    onChange={patientformik.handleChange}
                    onBlur={patientformik.handleBlur}
                    error={
                      patientformik.touched.room &&
                      Boolean(patientformik.errors.room)
                    }
                    helperText={
                      patientformik.touched.room && patientformik.errors.room
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
      </form>
    </>
  );
};
