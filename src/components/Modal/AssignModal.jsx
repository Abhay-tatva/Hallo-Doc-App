import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { useFormik } from "formik";
import BasicModal from "./Modal";
import { assignModalSchema } from "../ValidationSchema/index";
import { useDispatch, useSelector } from "react-redux";
import { getPhysician } from "../../redux/regionPhysician/regionPhysicianApi";
import { assignCase } from "../../redux/assignCase/assignCaseApi";

const AssignModal = ({ open, handleClose, handleOpen }) => {
  const { physicians } = useSelector(
    (state) => state.root.regionPhysicianReducer,
  );
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);

  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      description: "",
      physician: "",
    },
    validationSchema: assignModalSchema,
    onSubmit: (values, onSubmitProps) => {
      const name = values.physician.split(" ");

      dispatch(
        assignCase({
          confirmationNo: confirmation_no,
          firstname: name[0],
          lastname: name[1],
          assignReqDescription: values.description,
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
      header="Assign Request"
    >
      <form onSubmit={formik.handleSubmit}>
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
            helperText={
              formik.touched.searchRegion && formik.errors.searchRegion
            }
          >
            <MenuItem value="all">All Regions</MenuItem>
            {regions?.map((region, index) => {
              return (
                <MenuItem
                  key={index}
                  value={region.region_name}
                  onClick={() => dispatch(getPhysician(region.region_name))}
                >
                  {region.region_name}
                </MenuItem>
              );
            })}
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
            helperText={formik.touched.physician && formik.errors.physician}
          >
            {physicians &&
              physicians.map((physician) => {
                return (
                  <MenuItem
                    key={physician.sr_no}
                    value={`${physician.physician_name}`}
                  >
                    {`${physician.physician_name}`}
                  </MenuItem>
                );
              })}
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
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Submit" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default AssignModal;
