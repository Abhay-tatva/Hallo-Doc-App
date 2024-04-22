/* eslint-disable camelcase */

import React from "react";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { putRequestToadmin } from "../../redux/Provider Site/physicianMyProfile/physicianMyProfileApi";
import { useDispatch } from "react-redux";
// import { cancelCaseUpdate } from "../../redux/cancelCase/cancelCaseApi";
// import { requestCount } from "../../redux/requestCount/requestCountApi";
import { toast } from "react-toastify";
import { requestToAdminModalSchema } from "../ValidationSchema/RequestToAdminSchema";

const RequestToAdmin = ({ open, handleClose, handleOpen }) => {
  //   const state = useSelector((state) => state.root.cancelCaseReducer);
  //   const data = state?.data?.data[0];
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: requestToAdminModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        putRequestToadmin({
          message: values.message,
        }),
      ).then((response) => {
        if (response.type === "putRequestToadmin/fulfilled") {
          toast.success("request add successfully...");
          // dispatch(requestCount());
        }
      });
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  console.log("mesage", formik);
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Request To Administrator"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>Need to Send message to edit</Typography>
          <FormInput
            name="message"
            label="message"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="send" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default RequestToAdmin;
