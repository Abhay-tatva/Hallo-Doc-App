import React from "react";
import { useFormik } from "formik";
import { sendAgreementModalSchema } from "../ValidationSchema/validationSchema";
import { Box, Typography } from "@mui/material";
import BasicModal from "./Modal";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import "./modal.css";

const SendAgreementModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      phonenumber: "",
      email: "",
    },
    validationSchema: sendAgreementModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("submmitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Send Agreement"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography className="text-dot">Patient Name</Typography>
          <Typography variant="caption">
            To Send Agreement please make sure you are updating the correct
            contact information below for the responsive party
          </Typography>
          <FormInput
            fullWidth
            name="phonenumber"
            label="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phonenumber}
            error={
              formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
            }
          />
          <FormInput
            fullWidth
            name="email"
            label="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
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

export default SendAgreementModal;
