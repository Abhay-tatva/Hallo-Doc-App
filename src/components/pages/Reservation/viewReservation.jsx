import React, { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";

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
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constant/route";
import { viewReservationSchema } from "../../ValidationSchema/index";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CancelModal from "../../Modal/CancelModal";
import AssignModal from "../../Modal/AssignModal";
import { cancelCase } from "../../../redux/cancelCase/cancelCaseApi";

const INITIAL_VALUES = {
  patientNotes: "",
  firstName: "",
  lastName: "",
  dob: "",
  phonenumber: "",
  email: "",
  region: "",
  business: "",
  room: "",
};

const ViewReservation = () => {
  const state = useSelector((state) => state.root.viewCaseReducer);
  const data = state?.data?.data[0];
  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: viewReservationSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    enableReinitialize: true,
  });
  const handleOpen = (name, rowId) => {
    setModalName(name);
    setOpen(true);
    dispatch(cancelCase(data?.confirmation_no));
  };
  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };
  useEffect(() => {
    setInitialValues(
      {
        patientNotes: data?.patient_data.patient_notes[0].description,
        firstName: data?.patient_data.first_name,
        lastName: data?.patient_data.last_name,
        dob: data?.patient_data.DOB,
        phonenumber: data?.patient_data.mobile_no,
        email: data?.patient_data.email,
        region: data?.patient_data.location_information.region,
        business: data?.patient_data.location_information.business_name,
        room: data?.patient_data.location_information.room,
      },
      [setInitialValues, data],
    );
  });

  return (
    <>
      <Box className="main-container">
        <Container maxWidth="md" className="container-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>View Reservation</b>
              </Typography>
              <span className="patient-btn">Patient</span>
            </Box>
            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              className="form-btn"
              onClick={() => navigate(-1)}
            />
          </Box>

          <form>
            <Paper className="full-paper">
              <Typography variant="h6">
                <b>Patient Information</b>
              </Typography>
              <Box className="conformation-number">
                <Typography variant="caption" display="block">
                  Conformation Number
                </Typography>
                <Typography variant="subtitle1" color="#39B3C3">
                  <b>{data?.confirmation_no}</b>
                </Typography>
              </Box>
              <FormInput
                name="patientNotes"
                label="Patient Notes"
                disabled
                multiline
                rows={4}
                fullWidth
                className="form-input, text-area"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.patientNotes}
                error={
                  formik.touched.patientNotes &&
                  Boolean(formik.errors.patientNotes)
                }
                helperText={
                  formik.touched.patientNotes && formik.errors.patientNotes
                }
              />
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
                    disabled
                    fullWidth
                    className="form-input"
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
                    disabled
                    fullWidth
                    className="form-input"
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
                  <FormInput
                    type="date"
                    fullWidth
                    disabled
                    className="form-input"
                    name="dob"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  />
                </Grid>
                <Grid item sm={12} md={5} lg={5}>
                  <PhoneInput
                    inputStyle={{ height: "55px", width: "100%" }}
                    name="phonenumber"
                    country="in"
                    disabled
                    label="Phone Number"
                    fullWidth="true"
                    onChange={(value) =>
                      formik.setFieldValue("phonenumber", value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values?.phonenumber?.toString()}
                    error={
                      formik.touched.phonenumber &&
                      Boolean(formik.errors.phonenumber)
                    }
                    helperText={
                      formik.touched.phonenumber && formik.errors.phonenumber
                    }
                  />
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
                    disabled
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    disabled
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.region}
                    error={
                      formik.touched.region && Boolean(formik.errors.region)
                    }
                    helperText={formik.touched.region && formik.errors.region}
                  />
                </Grid>
                <Grid item xs={11} md={5}>
                  <FormInput
                    name="business"
                    className="form-input"
                    label="Business Name/Address"
                    fullWidth
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.business}
                    error={
                      formik.touched.business && Boolean(formik.errors.business)
                    }
                    helperText={
                      formik.touched.business && formik.errors.business
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
                    disabled
                    className="form-input"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.room}
                    error={formik.touched.room && Boolean(formik.errors.room)}
                    helperText={formik.touched.room && formik.errors.room}
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                mt={4}
                className="end-btn"
              >
                {data?.request_state === "new" && (
                  <Button
                    name="Assign"
                    variant="contained"
                    color="primary"
                    className="form-btn backbtn"
                    onClick={() => handleOpen("Assign Case")}
                  />
                )}

                <Button
                  onClick={() => navigate(AppRoutes.NOTES)}
                  name="View Notes"
                  variant="contained"
                  className="form-btn viewbtn"
                />

                <Button
                  name="Cancel"
                  variant="contained"
                  color="error"
                  className="form-btn"
                  onClick={() => handleOpen("Cancel Case")}
                />
              </Box>
            </Paper>
          </form>
        </Container>
      </Box>
      <CancelModal
        open={open && modalName === "Cancel Case"}
        handleClose={handleClose}
        handleOpen={modalName === "Cancel Case" ? handleOpen : null}
      />
      <AssignModal
        open={open && modalName === "Assign Case"}
        handleClose={handleClose}
        handleOpen={modalName === "Assign Case" ? handleOpen : null}
      />
    </>
  );
};

export default ViewReservation;
