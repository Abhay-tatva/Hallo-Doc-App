/* eslint-disable camelcase */

import React from "react";
import { sendLinkModalSchema } from "../ValidationSchema/index";
import BasicModal from "./Modal";
import { FormInput } from "../TextField/FormInput";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { Button } from "../Button/ButtonInput";
import { useDispatch } from "react-redux";
import { sendLink } from "../../redux/sendLink/sendLinkApi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SendLinkModal = ({ open, handleClose, handleOpen }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile_no: "",
      email: "",
    },

    validationSchema: sendLinkModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        sendLink({
          firstname: formik.values.firstName,
          lastname: formik.values.lastName,
          mobile_no: formik.values.mobile_no,
          email: formik.values.email,
        }),
      );
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Send mail to patient for Submitting request"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <FormInput
            name="firstName"
            label="First Name"
            fullwidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            fullwidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <PhoneInput
            name="mobile_no"
            country={"in"}
            inputStyle={{ width: "100%", height: "3.438rem" }}
            value={formik.values.mobile_no}
            onChange={(value) => formik.setFieldValue("mobile_no", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile_no && Boolean(formik.errors.mobile_no)}
            helperText={formik.touched.mobile_no && formik.errors.mobile_no}
          />

          <FormInput
            name="email"
            label="Email"
            fullwidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Send" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default SendLinkModal;
