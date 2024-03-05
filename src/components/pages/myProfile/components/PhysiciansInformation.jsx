import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import PhoneInput from "react-phone-input-2";
import { Button } from "../../../Button/ButtonInput";
import { physicianSchema } from "../../../ValidationSchema/PhysicianSchema";
import { useFormik } from "formik";

const PhysiciansInformation = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const physicianformik = useFormik({
    initialValues: {
      firstname: "123123",
      lastname: "145123",
      email: "test123@maillinator.com",
      phoneNumber: "(123) 456-789123",
      medicalLicence: "145263ubsbpudoysitsitsitsitaayraydPydPyra",
      npiNumber: "",
      synEmail: "",
    },
    validationSchema: physicianSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <form onSubmit={physicianformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Physician Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="firstname"
            label="First Name"
            fullWidth
            className="form-input"
            value={physicianformik.values.firstname}
            disabled={isDisabled}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.firstname &&
              Boolean(physicianformik.errors.firstname)
            }
            helperText={
              physicianformik.touched.firstname &&
              physicianformik.errors.firstname
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="lastname"
            label="Last Name"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            value={physicianformik.values.lastname}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.lastname &&
              Boolean(physicianformik.errors.lastname)
            }
            helperText={
              physicianformik.touched.lastname &&
              physicianformik.errors.lastname
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="email"
            label="Email"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            value={physicianformik.values.email}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.email &&
              Boolean(physicianformik.errors.lastname)
            }
            helperText={
              physicianformik.touched.email && physicianformik.errors.email
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
            className="form-input"
            disabled={isDisabled}
            value={physicianformik.values.phoneNumber}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.confirmemail &&
              Boolean(physicianformik.errors.phoneNumber)
            }
            helperText={
              physicianformik.touched.phoneNumber &&
              physicianformik.errors.confirmemail
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="medicalLicence"
            label="Medical Licence"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            value={physicianformik.values.medicalLicence}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.medicalLicence &&
              Boolean(physicianformik.errors.medicalLicence)
            }
            helperText={
              physicianformik.touched.medicalLicence &&
              physicianformik.errors.medicalLicence
            }
          ></FormInput>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="npiNumber"
            label="NPI Number"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.npiNumber &&
              Boolean(physicianformik.errors.npiNumber)
            }
            helperText={
              physicianformik.touched.npiNumber &&
              physicianformik.errors.npiNumber
            }
          ></FormInput>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="synEmail"
            label="Synchronization Email Address"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.synEmail &&
              Boolean(physicianformik.errors.synEmail)
            }
            helperText={
              physicianformik.touched.synEmail &&
              physicianformik.errors.synEmail
            }
          ></FormInput>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="District Of Columbia"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="New York"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Virginia"
          />
          <FormControlLabel
            control={<Checkbox size="medium" />}
            label="Maryland"
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
        {isDisabled ? (
          <Button
            name="Edit"
            variant="contained"
            color="primary"
            onClick={() => {
              setIsDisabled(false);
            }}
          />
        ) : (
          <>
            <Button
              name="Save"
              variant="contained"
              type="submit"
              onClick={() => {
                setIsDisabled(true);
              }}
            />
            <Button
              name="Cancel"
              variant="outlined"
              onClick={() => {
                setIsDisabled(true);
              }}
            />
          </>
        )}
      </Box>
    </form>
  );
};

export default PhysiciansInformation;
