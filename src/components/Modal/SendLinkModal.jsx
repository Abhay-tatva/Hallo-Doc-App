import React from "react";
import { sendLinkModalSchema } from "../ValidationSchema/index";
import BasicModal from "./Modal";
import { FormInput } from "../TextField/FormInput";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { Button } from "../Button/ButtonInput";

const SendLinkModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: sendLinkModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("Form submmitted", values);
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
            name="phoneNumber"
            country={"in"}
            inputStyle={{ width: "100%", height: "3.438rem" }}
            value={formik.values.phoneNumber}
            onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
