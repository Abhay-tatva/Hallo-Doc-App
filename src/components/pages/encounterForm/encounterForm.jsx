/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import "./encounterForm.css";
import { useFormik } from "formik";
import PhoneFormInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
// import { encounterFormSchema } from "../../ValidationSchema";
// import {
//   editEncounterForm,
//   finalizeForm,
//   getEncounterForm,
//   saveEncounterForm,
// } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
// import { toast } from "react-toastify";
// import { clearEncounterForm } from "../../redux/halloSlices/providerSlices/encounterFormSlice";
import { FormInput } from "../../TextField/FormInput";
import { AppRoutes } from "../../../constant/route";
import { Button } from "../../Button/ButtonInput";
import { encounterFormSchema } from "../../ValidationSchema";
import {
  getEncounterForm,
  putEncounterForm,
  putFinalize,
} from "../../../redux/Provider Site/Encounter/encounterApi";
import { toast } from "react-toastify";
import { clearForm } from "../../../redux/slices/physicianSlice/encounterSlice";

const INITIAL_VALUES = {
  first_name: "",
  last_name: "",
  location: "",
  date_of_birth: "",
  date_of_service: "",
  phone_no: "",
  email: "",
  history_of_present: "",
  medical_history: "",
  medications: "",
  allergies: "",
  temperature: "",
  heart_rate: "",
  respiratory_rate: "",
  blood_pressure_1: "",
  blood_pressure_2: "",
  o2: "",
  pain: "",
  heent: "",
  cv: "",
  chest: "",
  abd: "",
  extr: "",
  skin: "",
  neuro: "",
  other: "",
  diagnosis: "",
  treatment_plan: "",
  medication_dispensed: "",
  procedures: "",
  follow_up: "",
};

const EncounterForm = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { encounterData } = useSelector((state) => state.encounterReducer);
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);

  // const { accountType } = useSelector((state) => state.root.loginReducer);

  //   const {
  //     id,
  //     patientFirstName,
  //     patientLastName,
  //     patientEmail,
  //     street,
  //     city,
  //     state,
  //     zipCode,
  //     dob,
  //     patientPhoneNumber,
  //   } = useSelector((state) => state.root.patientName);

  useEffect(() => {
    dispatch(getEncounterForm(confirmation_no));
  }, [dispatch, confirmation_no]);

  // const encounterDataConfirm = {
  //   confirmation_no: data[0].confirmation_no,
  // };
  const formik = useFormik({
    initialValues,
    validationSchema: encounterFormSchema,
    onSubmit: (values) => {
      //   if (encounterData?.id) {
      dispatch(
        putEncounterForm({
          data: formik?.values,
          confirmation_no,
        }),
      ).then((response) => {
        if (response.type === "putEncounterForm/fulfilled") {
          // toast.success(response?.payload?.message);
          navigate(AppRoutes.DASHBOARD);
        }
      });
      //   } else {
      //     dispatch(saveEncounterForm({ id, data: values })).then((response) => {
      //       if (response.type === "saveEncounterForm/fulfilled") {
      //         toast.success(response?.payload?.message);
      //       }
      //     });
      //   }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      first_name: encounterData?.first_name,
      last_name: encounterData?.last_name,
      location: encounterData?.location,
      date_of_birth: encounterData?.date_of_birth,
      date_of_service: encounterData?.date_of_service,
      phone_no: encounterData?.phone_no,
      email: encounterData?.email,
      history_of_present: encounterData?.history_of_present,
      medical_history: encounterData?.medical_history,
      medications: encounterData?.medication,
      allergies: encounterData?.allergies,
      temperature: encounterData?.temperature,
      heart_rate: encounterData?.heart_rate,
      respiratory_rate: encounterData?.respiratory_rate,
      blood_pressure: encounterData?.blood_pressure,
      o2: encounterData?.o2,
      pain: encounterData?.pain,
      heent: encounterData?.heent,
      cv: encounterData?.cv,
      chest: encounterData?.chest,
      abd: encounterData?.abd,
      extr: encounterData?.extr,
      skin: encounterData?.skin,
      neuro: encounterData?.neuro,
      other: encounterData?.other,
      diagnosis: encounterData?.diagnosis,
      treatment_plan: encounterData?.treatment_plan,
      medication_dispensed: encounterData?.medication_dispensed,
      procedures: encounterData?.procedures,
      follow_up: encounterData?.follow_up,
    });
  }, [encounterData]);

  const handleFinalize = () => {
    dispatch(putFinalize({ confirmation_no, finalize_status: true })).then(
      (response) => {
        if (response.type === "putFinalize/fulfilled") {
          toast.success("Form Finalize Successfulyy......");
          navigate(AppRoutes.DASHBOARD);
        }
      },
    );
  };

  return (
    <>
      <Box className="encounterForm-main-container ">
        <Container maxWidth="md" className="encounterForm-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Encounter Form</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => {
                formik.resetForm();
                dispatch(clearForm());
                navigate(-1);
              }}
              className="back-btn"
            />
          </Box>
          <Paper className="encounterForm-container">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <Typography variant="h5" className="encounter-form-header">
                <b>Medical Report Confidential</b>
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="first_name"
                    label="First Name"
                    fullWidth
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                    error={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="last_name"
                    label="Last Name"
                    fullWidth
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                    error={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="location"
                    label="Location"
                    fullWidth
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="date_of_birth"
                    // label="Date Of Birth"
                    type="date"
                    fullWidth
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.date_of_birth &&
                      formik.errors.date_of_birth
                    }
                    error={
                      formik.touched.date_of_birth &&
                      Boolean(formik.errors.date_of_birth)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="date_of_service"
                    type="date"
                    fullWidth
                    value={formik.values.date_of_service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.date_of_service &&
                      formik.errors.date_of_service
                    }
                    error={
                      formik.touched.date_of_service &&
                      Boolean(formik.errors.date_of_service)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PhoneFormInput
                    label="Phone Number"
                    name="phone_no"
                    // value={patientPhoneNumber}
                    country={"in"}
                    inputStyle={{ width: "100%", height: "3.438rem" }}
                    value={formik.values?.phone_no?.toString()}
                    onChange={(value) =>
                      formik.setFieldValue("phone_no", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phone_no && Boolean(formik.errors.phone_no)
                    }
                    helperText={
                      formik.touched.phone_no && formik.errors.phone_no
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
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="history_of_present"
                    label="History Of Present Illness Or Injury"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.history_of_present}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.history_of_present &&
                      formik.errors.history_of_present
                    }
                    error={
                      formik.touched.history_of_present &&
                      Boolean(formik.errors.history_of_present)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="medical_history"
                    label="Medical History"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.medical_history}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.medical_history &&
                      formik.errors.medical_history
                    }
                    error={
                      formik.touched.medical_history &&
                      Boolean(formik.errors.medical_history)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="medications"
                    label="Medications"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.medications}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.medications && formik.errors.medications
                    }
                    error={
                      formik.touched.medications &&
                      Boolean(formik.errors.medications)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="allergies"
                    label="Allergies"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.allergies}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.allergies && formik.errors.allergies
                    }
                    error={
                      formik.touched.allergies &&
                      Boolean(formik.errors.allergies)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="temperature"
                    label="Temp"
                    fullWidth
                    value={formik.values.temperature}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.temperature && formik.errors.temperature
                    }
                    error={
                      formik.touched.temperature &&
                      Boolean(formik.errors.temperature)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="heart_rate"
                    label="HR"
                    fullWidth
                    value={formik.values.heart_rate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.heart_rate && formik.errors.heart_rate
                    }
                    error={
                      formik.touched.heart_rate &&
                      Boolean(formik.errors.heart_rate)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="respiratory_rate"
                    label="RR"
                    fullWidth
                    value={formik.values.respiratory_rate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.respiratory_rate &&
                      formik.errors.respiratory_rate
                    }
                    error={
                      formik.touched.respiratory_rate &&
                      Boolean(formik.errors.respiratory_rate)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormInput
                    name="blood_pressure_1"
                    label="Blood Pressure(Systolic)"
                    fullWidth
                    value={formik.values.blood_pressure_1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.blood_pressure_1 &&
                      formik.errors.blood_pressure_1
                    }
                    error={
                      formik.touched.blood_pressure_1 &&
                      Boolean(formik.errors.blood_pressure_1)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormInput
                    name="blood_pressure_2"
                    label="Blood Pressure(Diastolic)"
                    fullWidth
                    value={formik.values.blood_pressure_2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.blood_pressure_2 &&
                      formik.errors.blood_pressure_2
                    }
                    error={
                      formik.touched.blood_pressure_2 &&
                      Boolean(formik.errors.blood_pressure_2)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="o2"
                    label="O2"
                    fullWidth
                    value={formik.values.o2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.o2 && formik.errors.o2}
                    error={formik.touched.o2 && Boolean(formik.errors.o2)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormInput
                    name="pain"
                    label="Pain"
                    fullWidth
                    value={formik.values.pain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.pain && formik.errors.pain}
                    error={formik.touched.pain && Boolean(formik.errors.pain)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="heent"
                    label="Heent"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.heent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.heent && formik.errors.heent}
                    error={formik.touched.heent && Boolean(formik.errors.heent)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="cv"
                    label="CV"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.cv}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.cv && formik.errors.cv}
                    error={formik.touched.cv && Boolean(formik.errors.cv)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="chest"
                    label="Chest"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.chest}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.chest && formik.errors.chest}
                    error={formik.touched.chest && Boolean(formik.errors.chest)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="abd"
                    label="ABD"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.abd}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.abd && formik.errors.abd}
                    error={formik.touched.abd && Boolean(formik.errors.abd)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="extr"
                    label="Extr"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.extr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.extr && formik.errors.extr}
                    error={formik.touched.extr && Boolean(formik.errors.extr)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="skin"
                    label="Skin"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.skin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.skin && formik.errors.skin}
                    error={formik.touched.skin && Boolean(formik.errors.skin)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="neuro"
                    label="Neuro"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.neuro}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.neuro && formik.errors.neuro}
                    error={formik.touched.neuro && Boolean(formik.errors.neuro)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="other"
                    label="Other"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.other}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.other && formik.errors.other}
                    error={formik.touched.other && Boolean(formik.errors.other)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="diagnosis"
                    label="Diagnosis"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.diagnosis}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.diagnosis && formik.errors.diagnosis
                    }
                    error={
                      formik.touched.diagnosis &&
                      Boolean(formik.errors.diagnosis)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="treatment_plan"
                    label="Treatment Plan"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.treatment_plan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.treatment_plan &&
                      formik.errors.treatment_plan
                    }
                    error={
                      formik.touched.treatment_plan &&
                      Boolean(formik.errors.treatment_plan)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="medication_dispensed"
                    label="Medication Dispensed"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.medication_dispensed}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.medication_dispensed &&
                      formik.errors.medication_dispensed
                    }
                    error={
                      formik.touched.medication_dispensed &&
                      Boolean(formik.errors.medication_dispensed)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="procedures"
                    label="Procedures"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.procedures}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.procedures && formik.errors.procedures
                    }
                    error={
                      formik.touched.procedures &&
                      Boolean(formik.errors.procedures)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="follow_up"
                    label="Follow Up"
                    fullWidth
                    multiline
                    rows={2}
                    value={formik.values.follow_up}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.follow_up && formik.errors.follow_up
                    }
                    error={
                      formik.touched.follow_up &&
                      Boolean(formik.errors.follow_up)
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
                pt={4}
                pb={1}
              >
                <Button name="Save Changes" type="submit" />

                <Button
                  name="Finalize"
                  color="secondary"
                  variant="contained"
                  onClick={handleFinalize}
                />

                <Button
                  name="Cancel"
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    dispatch(clearForm());
                    // dispatch(clearEncounterForm());
                    navigate(AppRoutes.DASHBOARD);
                  }}
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EncounterForm;
