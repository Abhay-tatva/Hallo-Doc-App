/* eslint-disable camelcase */

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { accountMyProfileSchema } from "../../../ValidationSchema/MyProfileSchema";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProfile,
  putMyProfile,
} from "../../../../redux/myProfile/myProfileApi";
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  confirmeMail: "",
  mobileNo: "",
  regions: [],
};
const Administrator = ({
  firstName,
  lastName,
  email,
  mobileNo,
  regions,
  userId,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const data = useSelector((state) => state.root.regionPhysicianReducer);
  const dispatch = useDispatch();
  const administratorformik = useFormik({
    initialValues,
    validationSchema: accountMyProfileSchema,
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
      confirmeMail: email,
      mobileNo: mobileNo?.toString(),
      regions: regions.map((region) => region.region_id),
    });
  }, [firstName, lastName, email, mobileNo, regions]);

  const handleChangeRegions = (name) => {
    const newRegions = administratorformik.values.regions?.includes(name)
      ? administratorformik.values.regions?.filter(
          (selectedName) => selectedName !== name,
        )
      : [...administratorformik.values.regions, name];
    administratorformik.setFieldValue("regions", newRegions);
  };

  return (
    <form onSubmit={administratorformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Administrator Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="firstName"
            label="First Name"
            fullWidth
            className="form-input"
            value={administratorformik.values.firstName}
            disabled={isDisabled}
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.firstName &&
              Boolean(administratorformik.errors.firstName)
            }
            helperText={
              administratorformik.touched.firstName &&
              administratorformik.errors.firstName
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="lastName"
            label="Last Name"
            fullWidth
            className="form-input"
            value={administratorformik.values.lastName}
            disabled={isDisabled}
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.lastName &&
              Boolean(administratorformik.errors.lastName)
            }
            helperText={
              administratorformik.touched.lastName &&
              administratorformik.errors.lastName
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="email"
            label="Email"
            fullWidth
            className="form-input"
            value={administratorformik.values.email}
            disabled={isDisabled}
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.email &&
              Boolean(administratorformik.errors.email)
            }
            helperText={
              administratorformik.touched.email &&
              administratorformik.errors.email
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="confirmeMail"
            label="Confirm Email"
            fullWidth
            className="form-input"
            value={administratorformik.values.confirmeMail}
            onChange={administratorformik.handleChange}
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.confirmeMail &&
              Boolean(administratorformik.errors.confirmeMail)
            }
            helperText={
              administratorformik.touched.confirmeMail &&
              administratorformik.errors.confirmeMail
            }
            disabled={isDisabled}
          >
            <MenuItem value="masteradmin">Master Admin</MenuItem>
            <MenuItem value="localadmin">Local Admin</MenuItem>
          </FormInput>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PhoneInput
            inputStyle={{ height: "55px", width: "100%" }}
            name="mobileNo"
            country="in"
            label="Phone Number"
            fullWidth="true"
            className="form-input"
            onChange={(value) =>
              administratorformik.setFieldValue("mobileNo", value)
            }
            onBlur={administratorformik.handleBlur}
            error={
              administratorformik.touched.mobileNo &&
              Boolean(administratorformik.errors.mobileNo)
            }
            helperText={
              administratorformik.touched.mobileNo &&
              administratorformik.errors.mobileNo
            }
            value={administratorformik.values?.mobileNo?.toString()}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {data.regions.map((region, index) => {
            return (
              <FormControlLabel
                className="checkbox-padding"
                disabled={isDisabled}
                key={index}
                control={
                  <Checkbox
                    size="small"
                    checked={administratorformik.values.regions?.includes(
                      region?.region_id,
                    )}
                    onChange={() => handleChangeRegions(region?.region_id)}
                  />
                }
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
              onClick={() => {
                dispatch(
                  putMyProfile({
                    user_id: userId,
                    data: administratorformik.values,
                  }),
                ).then((respons) => {
                  console.log("object", respons);
                  if (respons.type === "putMyProfile/fulfilled") {
                    dispatch(getMyProfile(userId));
                  }
                });

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

export default Administrator;
