import React, { useState } from "react";
import BasicModal from "./Modal";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { getPhysician } from "../../redux/regionPhysician/regionPhysicianApi";
import { useFormik } from "formik";
import { Button } from "../Button/ButtonInput";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { CreateModalSchema } from "../ValidationSchema/CreateShiftModalSchema";

const CreateShift = ({ open, handleClose, handleOpen }) => {
  const [checked, setChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      searchRegion: "",
      physician: "",
    },
    validationSchema: CreateModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("submitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  const { physicians } = useSelector(
    (state) => state.root.regionPhysicianReducer,
  );
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const dispatch = useDispatch();

  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Create Shift"
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
                name="dob"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
              />
            </Grid>
            {/* <Grid item xs={6}> */}
            {/* </Grid> */}
          </Grid>
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input label="Start" type="time" fullWidth />
            <Input label="End" type="time" fullWidth />
          </Box>
          <Box display="flex">
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                  }}
                />
              }
              label="Repeat"
              labelPlacement="repeat"
            />
          </Box>
          <Grid item xs={12} md={6}>
            <Typography>
              <b>Repeat Days</b>
            </Typography>
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Sunday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Monday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Tuesday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Wednesday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every thursday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Friday"
            />
            <FormControlLabel
              control={<Checkbox disabled={!checked} size="medium" />}
              label="Every Saturday"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <FormInput
              label="Repeat End"
              fullWidth
              disabled={!checked}
              select
              name="dob"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
            >
              <MenuItem>2-times</MenuItem>
              <MenuItem>1-times</MenuItem>
              <MenuItem>0-times</MenuItem>
            </FormInput>
          </Grid>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Save" variant="contained" Type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default CreateShift;
