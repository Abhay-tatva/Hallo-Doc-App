/* eslint-disable camelcase */

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
import { getShiftPhysician } from "../../redux/regionPhysician/regionPhysicianApi";
import { useFormik } from "formik";
import { Button } from "../Button/ButtonInput";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { CreateModalSchema } from "../ValidationSchema/CreateShiftModalSchema";
import {
  getProviderShift,
  postCreateShift,
} from "../../redux/Scheduling/schedulingApi";
import { toast } from "react-toastify";
import {
  getMySchedule,
  postMyScheduleCreateShift,
} from "../../redux/Provider Site/mySchedule/myScheduleApi";

const CreateShift = ({ open, handleClose, handleOpen }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { accountType } = useSelector((state) => state.root.loginReducer);
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const { shiftPhysician } = useSelector(
    (state) => state.root.regionPhysicianReducer,
  );
  const formik = useFormik({
    initialValues: {
      isAdmin: accountType === "admin",
      searchRegion: "",
      physician: "",
      date: "",
      startTime: "",
      endTime: "",
      repeatDays: [],
      repeatEnd: "",
    },
    validationSchema: CreateModalSchema,
    onSubmit: (values, onSubmitProps) => {
      if (accountType === "admin") {
        dispatch(
          postCreateShift({
            region: values.searchRegion,
            physician: values.physician,
            shift_date: values.date,
            start: values.startTime,
            end: values.endTime,
            repeat_days: values.repeatDays.join(","),
            repeat_end: values.repeatEnd,
          }),
        ).then((response) => {
          if (response.type === "postCreateShift/fulfilled") {
            toast.success("Shift Created Successfully");
            dispatch(getProviderShift({ region: "all" }));
          }
        });
      } else if (accountType === "physician") {
        dispatch(
          postMyScheduleCreateShift({
            region: values.searchRegion,
            shift_date: values.date,
            start: values.startTime,
            end: values.endTime,
            repeat_days: values.repeatDays.join(","),
            repeat_end: values.repeatEnd,
          }),
        )
          .then((response) => {
            if (response.type === "postMyScheduleCreateShift/fulfilled") {
              toast.success("Shift Created Successfully");
              dispatch(getMySchedule());
            }
          })
          .catch((error) => {
            // Handle error
          });
      }

      onSubmitProps.resetForm();
      handleClose();
    },
  });

  const handleCheckboxChange = (name) => {
    const newRepeatDays = formik.values.repeatDays.includes(name)
      ? formik.values.repeatDays.filter((selectedName) => selectedName !== name)
      : [...formik.values.repeatDays, name];
    formik.setFieldValue("repeatDays", newRepeatDays);
  };

  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Create Shift"
    >
      <form onSubmit={formik.handleSubmit}>
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
                  onClick={() =>
                    dispatch(getShiftPhysician(region.region_name))
                  }
                >
                  {region.region_name}
                </MenuItem>
              );
            })}
          </FormInput>
          {accountType === "admin" && (
            <FormInput
              name="physician"
              fullWidth
              label="Select Physician"
              select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.physician}
              error={
                formik.touched.physician && Boolean(formik.errors.physician)
              }
            >
              {shiftPhysician &&
                shiftPhysician.map((physician) => {
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
          )}
          <Grid container gap={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormInput
                type="date"
                fullWidth
                name="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                min={new Date().toISOString().split("T")[0]}
              />
            </Grid>
            {/* <Grid item xs={6}> */}
            {/* </Grid> */}
          </Grid>
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input
              name="startTime"
              label="Start"
              type="time"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
            />
            <Input
              name="endTime"
              label="End"
              type="time"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
            />
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
              control={
                <Checkbox
                  name="sunday"
                  disabled={!checked}
                  checked={formik.values.repeatDays.includes("sunday")}
                  onChange={() => handleCheckboxChange("sunday")}
                  size="medium"
                />
              }
              label="Every Sunday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="monday"
                  disabled={!checked}
                  checked={formik.values.repeatDays.includes("monday")}
                  onChange={() => handleCheckboxChange("monday")}
                  size="medium"
                />
              }
              label="Every Monday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="tuesday"
                  disabled={!checked}
                  checked={formik.values.repeatDays.includes("tuesday")}
                  onChange={() => handleCheckboxChange("tuesday")}
                  size="medium"
                />
              }
              label="Every Tuesday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wednesday"
                  disabled={!checked}
                  size="medium"
                  checked={formik.values.repeatDays.includes("wednesday")}
                  onChange={() => handleCheckboxChange("wednesday")}
                />
              }
              label="Every Wednesday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="thursday"
                  disabled={!checked}
                  size="medium"
                  checked={formik.values.repeatDays.includes("thursday")}
                  onChange={() => handleCheckboxChange("thursday")}
                />
              }
              label="Every thursday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="friday"
                  disabled={!checked}
                  size="medium"
                  checked={formik.values.repeatDays.includes("friday")}
                  onChange={() => handleCheckboxChange("friday")}
                />
              }
              label="Every Friday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="saturday"
                  disabled={!checked}
                  size="medium"
                  checked={formik.values.repeatDays.includes("saturday")}
                  onChange={() => handleCheckboxChange("saturday")}
                />
              }
              label="Every Saturday"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <FormInput
              label="Repeat End"
              fullWidth
              disabled={!checked}
              select
              name="repeatEnd"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatEnd}
              error={
                formik.touched.repeatEnd && Boolean(formik.errors.repeatEnd)
              }
              helperText={formik.touched.repeatEnd && formik.errors.repeatEnd}
            >
              <MenuItem value="2">2-times</MenuItem>
              <MenuItem value="3">3-times</MenuItem>
              <MenuItem value="4">4-times</MenuItem>
            </FormInput>
          </Grid>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Save" variant="contained" type="submit" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default CreateShift;
