import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import PhoneInput from "react-phone-input-2";
import { Button } from "../../../Button/ButtonInput";
import { physicianSchema } from "../../../ValidationSchema/PhysicianSchema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getProviderPhysician,
  putProviderInfo,
} from "../../../../redux/provider/providerApi";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  medicalLicence: "",
  npiNumber: "",
  synEmail: "",
};

const PhysiciansInformation = ({
  firstName,
  lastName,
  email,
  mobileNo,
  medicalLicence,
  npiNumber,
  synchronizationEmail,
  serviceAreasAvailability,
  districtOfColumbia,
  newYork,
  userId,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const dispatch = useDispatch();

  const physicianformik = useFormik({
    initialValues,
    validationSchema: physicianSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: mobileNo,
      medicalLicence: medicalLicence,
      npiNumber: npiNumber,
      synEmail: synchronizationEmail,
    });
  }, [
    firstName,
    lastName,
    email,
    mobileNo,
    medicalLicence,
    npiNumber,
    synchronizationEmail,
  ]);

  return (
    <form onSubmit={physicianformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Physician Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="firstName"
            label="First Name"
            fullWidth
            className="form-input"
            value={physicianformik.values.firstName}
            disabled={isDisabled}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.firstName &&
              Boolean(physicianformik.errors.firstName)
            }
            helperText={
              physicianformik.touched.firstName &&
              physicianformik.errors.firstName
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="lastName"
            label="Last Name"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            value={physicianformik.values.lastName}
            onChange={physicianformik.handleChange}
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.lastName &&
              Boolean(physicianformik.errors.lastName)
            }
            helperText={
              physicianformik.touched.lastName &&
              physicianformik.errors.lastName
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
              Boolean(physicianformik.errors.email)
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
            // value={physicianformik.values.phoneNumber}
            onChange={(value) =>
              physicianformik.setFieldValue("phoneNumber", value)
            }
            onBlur={physicianformik.handleBlur}
            error={
              physicianformik.touched.medicalLicence &&
              Boolean(physicianformik.errors.medicalLicence)
            }
            helperText={
              physicianformik.touched.medicalLicence &&
              physicianformik.errors.medicalLicence
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
            value={physicianformik.values.npiNumber}
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
            value={physicianformik.values.synEmail}
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
          {regions.map((region, index) => {
            const isChecked = serviceAreasAvailability?.regions?.some(
              (selectedRegion) =>
                selectedRegion.region_name === region.region_name,
            );
            return (
              <FormControlLabel
                className="checkbox-padding"
                disabled={isDisabled}
                key={index}
                control={<Checkbox size="small" checked={isChecked} />}
                label={region.region_name}
              />
            );
          })}
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
                dispatch(putProviderInfo(physicianformik.values)).then(
                  (response) => {
                    if (response.type === "putProviderInfo/fulfilled") {
                      dispatch(getProviderPhysician(userId));
                    }
                  },
                );
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
