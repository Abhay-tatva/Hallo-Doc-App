import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import "./createAccess.css";
import { useFormik } from "formik";
import { CreateAccessSchema } from "../../ValidationSchema";

const CreateAccess = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      rolename: "",
      role: "all",
    },
    validationSchema: CreateAccessSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <>
      <Box className="main-createaccess-container">
        <form>
          <Container maxWidth="lg" className="createacess-conatiner-wrapper">
            <Box display="flex" justifyContent="space-between" mb="8px">
              <Box display="flex">
                <Typography variant="h5" gutterBottom>
                  <b>Create Role</b>
                </Typography>
              </Box>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                onClick={() => navigate(-1)}
              />
            </Box>
            <Paper className="createacces-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="rolename"
                    label="Role Name"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    value={formik.values.rolename}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.rolename && Boolean(formik.errors.rolename)
                    }
                    helperText={
                      formik.touched.rolename && formik.errors.rolename
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="role"
                    label="Account Type"
                    select
                    fullWidth
                    className="form-input"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="physician">Physician</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={12}>
                  {formik.values.role !== "patient" && (
                    <>
                      {(formik.values.role === "all" ||
                        formik.values.role !== "physician" ||
                        formik.values.role === "admin") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="Regions"
                        />
                      )}
                      {(formik.values.role === "all" ||
                        formik.values.role !== "physician" ||
                        formik.values.role === "admin") && (
                        <>
                          <FormControlLabel
                            control={<Checkbox size="medium" />}
                            label="Scheduling"
                          />

                          <FormControlLabel
                            control={<Checkbox size="medium" />}
                            label="History"
                          />
                          <FormControlLabel
                            control={<Checkbox size="medium" />}
                            label="Accounts"
                          />
                          <FormControlLabel
                            control={<Checkbox size="medium" />}
                            label="MyProfile"
                          />
                        </>
                      )}
                      {(formik.values.role === "physician" ||
                        formik.values.role === "all" ||
                        formik.values.role === "admin") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="Dashboard"
                        />
                      )}

                      {(formik.values.role !== "admin" ||
                        formik.values.role === "all" ||
                        formik.values.role === "physician") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="History"
                        />
                      )}
                      {(formik.values.role !== "admin" ||
                        formik.values.role === "all" ||
                        formik.values.role === "physician") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="MySchedule"
                        />
                      )}

                      {(formik.values.role == "admin" ||
                        formik.values.role === "all" ||
                        formik.values.role === "physician") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="MyProfile"
                        />
                      )}
                      {(formik.values.role == "admin" ||
                        formik.values.role === "all" ||
                        formik.values.role !== "physician") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="Role"
                        />
                      )}
                      {(formik.values.role == "admin" ||
                        formik.values.role === "all" ||
                        formik.values.role !== "physician") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="Provider"
                        />
                      )}
                      {(formik.values.role == "admin" ||
                        formik.values.role === "all" ||
                        formik.values.role !== "physician") && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="RequestData"
                        />
                      )}
                      {formik.values.role !== "admin" && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="SendOrder"
                        />
                      )}
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="vendorsinfo"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Profession"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="SendOrder"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="EmailLogs"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloAdministrators"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloUsers"
                      />
                      {formik.values.role !== "admin" && (
                        <FormControlLabel
                          control={<Checkbox size="medium" />}
                          label="Dashboard"
                        />
                      )}
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="CancelledHistory"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="ProviderLocation"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloEmployee"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="HaloWorkPlace"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Chat"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="PatientRecords"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="BlockedHistory"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="Invoicing"
                      />
                      <FormControlLabel
                        control={<Checkbox size="medium" />}
                        label="SMSLogs"
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button name="Save" />
                <Button name="Cancel" variant="outlined" />
              </Box>
            </Paper>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default CreateAccess;
