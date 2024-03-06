import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { cancelModalSchema } from "../ValidationSchema/index";

const CancelModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      additionalnotes: "",
      canelReason: "",
    },
    validationSchema: cancelModalSchema,
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
      header="Confirm Cancellation"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography>
            Patient Name :<span style={{ color: "aqua" }}>test test</span>
          </Typography>
          <FormInput
            fullWidth
            label="Reason for Cancellation"
            select
            name="canelReason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.canelReason}
            error={
              formik.touched.canelReason && Boolean(formik.errors.canelReason)
            }
            helperText={formik.touched.canelReason && formik.errors.canelReason}
          >
            <MenuItem value="Service not Availabel">
              Service not Availabel
            </MenuItem>
            <MenuItem value="Doctor are not Availabel">
              Doctor are not Availabel
            </MenuItem>
            <MenuItem value="Slots are nbot free">Slots are nbot free</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </FormInput>
          <FormInput
            name="additionalnotes"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additionalnotes}
            error={
              formik.touched.additionalnotes &&
              Boolean(formik.errors.additionalnotes)
            }
            helperText={
              formik.touched.additionalnotes && formik.errors.additionalnotes
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

export default CancelModal;
