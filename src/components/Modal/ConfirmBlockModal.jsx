/* eslint-disable camelcase */

import React from "react";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { confirmBlockModalSchema } from "../ValidationSchema/index";
import { blockCasePut } from "../../redux/blockCaseApi.js/blockCaseApi";
import { useDispatch, useSelector } from "react-redux";
import { requestCount } from "../../redux/requestCount/requestCountApi";

const ConfirmBlockModal = ({ open, handleClose, handleOpen }) => {
  const state = useSelector((state) => state.root.blockCaseReducer);
  const data = state?.data?.data[0];
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      blockRequest: "",
    },
    validationSchema: confirmBlockModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        blockCasePut({
          confirmation_no: data.confirmation_no,
          reason_for_block: values.blockRequest,
        }),
      ).then((response) => {
        if (response.type === "blockCasePut/fulfilled") {
          dispatch(requestCount());
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
      header="Confirm Block"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :
            <span style={{ color: "aqua" }}>
              {data?.patient_data?.firstname},{data?.patient_data?.lastname}
            </span>
          </Typography>
          <FormInput
            name="blockRequest"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blockRequest}
            error={
              formik.touched.blockRequest && Boolean(formik.errors.blockRequest)
            }
            helperText={
              formik.touched.blockRequest && formik.errors.blockRequest
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Conform" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default ConfirmBlockModal;
