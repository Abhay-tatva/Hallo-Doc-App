/* eslint-disable camelcase */

import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { addressSchema } from "../../../ValidationSchema/MyProfileSchema";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getMyProfile,
  putMyProfile,
} from "../../../../redux/myProfile/myProfileApi";
import {
  getProviderPhysician,
  putProviderInfo,
} from "../../../../redux/provider/providerApi";

const INITIAL_VALUES = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  billNumber: "",
};
const Address = ({
  add1,
  add2,
  city,
  state,
  zip,
  billNumber,
  userId,
  name,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const dispatch = useDispatch();
  const { accountType } = useSelector((state) => state.root.loginReducer);

  const billformik = useFormik({
    initialValues,

    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    setInitialValues({
      address1: add1,
      address2: add2,
      city: city,
      state: state,
      zip: zip.toString(),
      billNumber: billNumber,
    });
  }, [add1, add2, city, state, zip, billNumber]);

  return (
    <form onSubmit={billformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Mailing & Billing Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="address1"
            label="Address 1"
            fullWidth
            className="form-input"
            value={billformik.values.address1}
            disabled={isDisabled}
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.address1 && Boolean(billformik.errors.address1)
            }
            helperText={
              billformik.touched.address1 && billformik.errors.address1
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="address2"
            label="Address 2"
            disabled={isDisabled}
            fullWidth
            value={billformik.values.address2}
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.address2 && Boolean(billformik.errors.address2)
            }
            helperText={
              billformik.touched.address2 && billformik.errors.address2
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="city"
            label="City"
            disabled={isDisabled}
            value={billformik.values.city}
            fullWidth
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={billformik.touched.city && Boolean(billformik.errors.city)}
            helperText={billformik.touched.city && billformik.errors.city}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="state"
            label="State"
            disabled={isDisabled}
            value={billformik.values.state}
            fullWidth
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={billformik.touched.state && Boolean(billformik.errors.state)}
            helperText={billformik.touched.state && billformik.errors.state}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="zip"
            label="Zip"
            disabled={isDisabled}
            fullWidth
            value={billformik?.values?.zip?.toString()}
            className="form-input"
            onChange={billformik.handleChange}
            onBlur={billformik.handleBlur}
            error={billformik.touched.zip && Boolean(billformik.errors.zip)}
            helperText={billformik.touched.zip && billformik.errors.zip}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PhoneInput
            inputStyle={{ height: "55px", width: "100%" }}
            name="billNumber"
            country="in"
            disabled={isDisabled}
            value={billformik.values?.billNumber?.toString()}
            label="Phone Number"
            fullWidth="true"
            className="form-input"
            onBlur={billformik.handleBlur}
            error={
              billformik.touched.billNumber &&
              Boolean(billformik.errors.billNumber)
            }
            helperText={
              billformik.touched.billNumber && billformik.errors.billNumber
            }
            onChange={(value) => billformik.setFieldValue("billNumber", value)}
          />
        </Grid>
      </Grid>
      {accountType === "admin" && (
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
                type="submit"
                variant="contained"
                onClick={() => {
                  if (name === "myProfile") {
                    dispatch(
                      putMyProfile({
                        user_id: userId,
                        data: billformik.values,
                      }),
                    ).then((response) => {
                      if (response.type === "putMyProfile/fulfilled") {
                        dispatch(getMyProfile(userId));
                        toast.success(response.payload.message);
                      } else if (response.type === "putMyProfile/rejected") {
                        toast.error(
                          response.payload.data.validation.body.message,
                        );
                      }
                    });
                    setIsDisabled(true);
                  }

                  if (name === "providerProfile") {
                    dispatch(
                      putProviderInfo({
                        user_id: userId,
                        data: billformik.values,
                      }),
                    ).then((response) => {
                      if (response.type === "putProviderInfo/fulfilled") {
                        dispatch(getProviderPhysician(userId));
                      }
                    });
                    setIsDisabled(true);
                  }
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
      )}
    </form>
  );
};

export default Address;
