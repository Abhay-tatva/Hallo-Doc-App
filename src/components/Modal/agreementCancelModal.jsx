/* eslint-disable camelcase */

import { useFormik } from "formik";
import React from "react";
import BasicModal from "./Modal";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { requestModalSchema } from "../ValidationSchema/index";
import { useDispatch, useSelector } from "react-redux";
import { cancelAgreement } from "../../redux/patientSite/patientDashboard/cancelAgreementApi";
import { toast } from "react-toastify";

const AgreementCancel = ({ open, handleClose, handleOpen }) => {
  const dispatch = useDispatch();
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: requestModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("object", confirmation_no);
      dispatch(
        cancelAgreement({
          cancel_confirmation: formik.values.message,
          confirmation_no,
        }),
      ).then((response) => {
        if (response.type === "cancelAgreement/fulfilled") {
          toast.success("Agreement Cancel successfully...");
        }
      });
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Cancel Confirmation"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>Test Test</Typography>
          <FormInput
            name="message"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Confirm" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default AgreementCancel;
