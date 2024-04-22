/* eslint-disable camelcase */

import React from "react";
import { useFormik } from "formik";
import { sendAgreementModalSchema } from "../ValidationSchema/index";
import { Box, Typography } from "@mui/material";
import BasicModal from "./Modal";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { sendAgreement } from "../../redux/sendAgreement/sendAgreementApi";

const SendAgreementModal = ({ open, handleClose, handleOpen }) => {
  const dispatch = useDispatch();
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);

  const formik = useFormik({
    initialValues: {
      phonenumber: "",
      email: "",
    },
    validationSchema: sendAgreementModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        sendAgreement({
          confirmationnumber: confirmation_no,
          mobile_no: values.phonenumber,
          email: values.email,
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
      header="Send Agreement"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography className="text-dot">Patient </Typography>
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
