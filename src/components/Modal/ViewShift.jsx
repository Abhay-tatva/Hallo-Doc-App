import React from "react";
import BasicModal from "./Modal";
import { Box, Grid, Input, MenuItem } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getPhysician } from "../../redux/regionPhysician/regionPhysicianApi";
import { Button } from "../Button/ButtonInput";
import { ViewModalSchema } from "../ValidationSchema";

const ViewShift = ({ open, handleClose, handleOpen }) => {
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      physician: "",
    },
    validationSchema: ViewModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("submitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  const { physicians } = useSelector(
    (state) => state.root.regionPhysicianReducer,
  );
  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="View Shift"
    >
      <form>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
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
          <Grid container gap={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormInput
                type="date"
                fullWidth
                // name="dob"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.dob}
                // error={formik.touched.dob && Boolean(formik.errors.dob)}
                // helperText={formik.touched.dob && formik.errors.dob}
              />
            </Grid>
            {/* <Grid item xs={6}> */}
            {/* </Grid> */}
          </Grid>
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input label="Start" type="time" fullWidth />
            <Input label="End" type="time" fullWidth />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Return" variant="contained" />
            <Button name="Edit" variant="contained" />
            <Button name="Delete" variant="contained" color="error" />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default ViewShift;
