/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import "./addBussiness.css";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import { businessSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartners,
  postBusiness,
  putBusinessUpdate,
} from "../../../redux/partners/partnersApi";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../constant/route";
import { clearPartnersData } from "../../../redux/slices/partnersSlice";
import { Button } from "../../Button/ButtonInput";

const INITIAL_VALUES = {
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
};

const AddBussiness = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { businessView } = useSelector((state) => state.root.partnersReducer);
  const businessFormik = useFormik({
    initialValues,
    validationSchema: businessSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postBusiness({
          business_name: values.businessName,
          profession: values.profession,
          fax_number: values.faxNumber,
          mobile_no: values.phoneNumber?.toString(),
          email: values.email,
          business_contact: values.bussinessContact,
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zipPostal,
        }),
      ).then((response) => {
        if (response.type === "postBusiness/fulfilled") {
          toast.success("Bussiness Add Successfully");
          navigate(AppRoutes.PARTNERS);
          dispatch(getPartners());
        }
      });
      onSubmitProps.resetForm();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      businessName: businessView.business_name,
      profession: businessView.profession,
      faxNumber: businessView.fax_number,
      phoneNumber: businessView.phone_no,
      email: businessView.email,
      bussinessContact: businessView.business_contact,
      street: businessView.street,
      city: businessView.city,
      state: businessView.state,
      zipPostal: businessView.zip,
    });
  }, [businessView]);

  const handleSave = () => {
    if (businessView?.business_id) {
      dispatch(
        putBusinessUpdate({
          business_id: businessView.business_id,
          data: businessFormik.values,
        }),
      ).then((response) => {
        if (response.type === "putBusinessUpdate/fulfilled") {
          dispatch(clearPartnersData());
          navigate(AppRoutes.PARTNERS);
        }
      });
    } else {
      dispatch(postBusiness({ data: businessFormik.values })).then(
        (response) => {
          if (response.type === "postBusiness/fulfilled") {
            dispatch(clearPartnersData());
            navigate(AppRoutes.PARTNERS);
          }
        },
      );
    }
  };

  return (
    <>
      <form onSubmit={businessFormik.handleSubmit}>
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
                // size="small"
                startIcon={<ArrowBackIosNewOutlinedIcon />}
                onClick={() => {
                  dispatch(clearPartnersData());
                  navigate(-1);
                }}
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
                    onChange={(event) =>
                      businessFormik.setFieldValue(
                        "faxNumber",
                        event.target.value,
                      )
                    }
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
                    country="in"
                    value={businessFormik?.values?.phoneNumber?.toString()}
                    label="Phone Number"
                    fullWidth="true"
                    onChange={(value) =>
                      businessFormik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.phoneNumber &&
                      Boolean(businessFormik.errors.phoneNumber)
                    }
                    helperText={
                      businessFormik.touched.phoneNumber &&
                      businessFormik.errors.phoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    value={businessFormik.values.email}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.email &&
                      Boolean(businessFormik.errors.email)
                    }
                    helperText={
                      businessFormik.touched.email &&
                      businessFormik.errors.email
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="bussinessContact"
                    label="Bussiness Contact"
                    fullWidth
                    value={businessFormik.values.bussinessContact}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.bussinessContact &&
                      Boolean(businessFormik.errors.bussinessContact)
                    }
                    helperText={
                      businessFormik.touched.bussinessContact &&
                      businessFormik.errors.bussinessContact
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="street"
                    label="Street"
                    fullWidth
                    value={businessFormik.values.street}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.street &&
                      Boolean(businessFormik.errors.street)
                    }
                    helperText={
                      businessFormik.touched.street &&
                      businessFormik.errors.street
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="city"
                    label="City"
                    fullWidth
                    value={businessFormik.values.city}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.city &&
                      Boolean(businessFormik.errors.city)
                    }
                    helperText={
                      businessFormik.touched.city && businessFormik.errors.city
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="state"
                    label="State"
                    fullWidth
                    value={businessFormik.values.state}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.state &&
                      Boolean(businessFormik.errors.state)
                    }
                    helperText={
                      businessFormik.touched.state &&
                      businessFormik.errors.state
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="zipPostal"
                    label="Zip/Postal"
                    fullWidth
                    value={businessFormik.values.zipPostal}
                    onChange={businessFormik.handleChange}
                    onBlur={businessFormik.handleBlur}
                    error={
                      businessFormik.touched.zipPostal &&
                      Boolean(businessFormik.errors.zipPostal)
                    }
                    helperText={
                      businessFormik.touched.zipPostal &&
                      businessFormik.errors.zipPostal
                    }
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
                <Button
                  name="Save"
                  variant="contained"
                  type="submit"
                  onClick={handleSave}
                />
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
