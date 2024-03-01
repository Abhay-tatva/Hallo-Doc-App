import { useFormik } from "formik";
import React from "react";
import BasicModal from "./Modal";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { requestModalSchema } from "../ValidationSchema/RequestModalSchema";

const RequestModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: requestModalSchema,
    onSubmit: (values) => {
      console.log("submmitted", values);
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Request Support"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            To all unscheduled Physicians: We are short on coverage and needs
            additional support On Call to respond to the Request
          </Typography>
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
            <Button name="Send" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default RequestModal;
