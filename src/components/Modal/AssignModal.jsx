import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { assignModalSchema } from "../ValidationSchema/validationSchema";

const AssignModal = ({ open, handleClose, handleOpen }) => {
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      description: "",
      physician: "",
    },
    validationSchema: assignModalSchema,
    onSubmit: (values) => {
      console.log("submmitted", values);
    },
  });
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Assign Request"
    >
      <form>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <Typography variant="caption">
            To assign this request, searach and select another Physician
          </Typography>
          <FormInput
            fullWidth
            name="searchRegion"
            label="Nerrow Search By Region"
            select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.searchRegion}
            error={
              formik.touched.searchRegion && Boolean(formik.errors.searchRegion)
            }
          >
            <MenuItem value="all">Service not Availabel</MenuItem>
            <MenuItem value="all">Doctor are not Availabel</MenuItem>
            <MenuItem value="all">Slots are nbot free</MenuItem>
            <MenuItem value="all">Other</MenuItem>
          </FormInput>
          <FormInput
            name="physician"
            fullWidth
            label="Select Physician"
            select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.physician}
            error={formik.touched.physician && Boolean(formik.errors.physician)}
          >
            <MenuItem value="all">Service not Availabel</MenuItem>
            <MenuItem value="all">Doctor are not Availabel</MenuItem>
            <MenuItem value="all">Slots are nbot free</MenuItem>
            <MenuItem value="all">Other</MenuItem>
          </FormInput>
          <FormInput
            name="description"
            label="Provide Addtional Notes"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Submit" variant="contained" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default AssignModal;
