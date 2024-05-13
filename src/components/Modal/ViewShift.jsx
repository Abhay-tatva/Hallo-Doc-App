/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import BasicModal from "./Modal";
import { Box, Grid, Input, MenuItem } from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button } from "../Button/ButtonInput";
import { ViewModalSchema } from "../ValidationSchema";
import {
  deleteShift,
  getProviderShift,
  putEditShift,
  putReturnShift,
} from "../../redux/Scheduling/schedulingApi";
import { toast } from "react-toastify";
import {
  getMySchedule,
  putMyScheduleEdit,
} from "../../redux/Provider Site/mySchedule/myScheduleApi";

const INITIAL_VALUES = {
  searchRegion: "",
  physician: "",
  date: "",
  startTime: "",
  endTime: "",
};
const ViewShift = ({ open, handleClose, handleOpen }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const dispatch = useDispatch();

  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  // const { physicians } = useSelector(
  //   (state) => state.root.regionPhysicianReducer,
  // );
  const { viewShiftData } = useSelector(
    (state) => state.root.schedulingReducer,
  );
  const { myScheduleViewShiftData } = useSelector(
    (state) => state.root.myScheduleReducer,
  );
  console.log("myschedule", myScheduleViewShiftData);
  const { accountType } = useSelector((state) => state.root.loginReducer);

  const formik = useFormik({
    initialValues,
    validationSchema: ViewModalSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("submitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
    enableReinitialize: true,
  });

  const checkShift = (shiftDate) => {
    const today = new Date();
    const shiftDateObj = new Date(shiftDate);
    today.setHours(0, 0, 0, 0);
    shiftDateObj.setHours(0, 0, 0, 0);
    return shiftDateObj < today;
  };

  useEffect(() => {
    if (accountType === "admin") {
      setInitialValues({
        searchRegion: viewShiftData?.region,
        physician: viewShiftData?.physician,
        date: viewShiftData?.shift_date,
        startTime: viewShiftData?.start,
        endTime: viewShiftData?.end,
      });
    } else {
      setInitialValues({
        searchRegion: myScheduleViewShiftData?.region,
        // physician: myScheduleViewShiftData?.physician,
        date: myScheduleViewShiftData?.shift_date,
        startTime: myScheduleViewShiftData?.start,
        endTime: myScheduleViewShiftData?.end,
      });
    }
  }, [viewShiftData, accountType, myScheduleViewShiftData]);

  const handleSave = () => {
    if (accountType === "admin") {
      dispatch(
        putEditShift({
          shift_id: viewShiftData.shift_id,
          region: formik.values.searchRegion,
          physician: formik.values.physician,
          shift_date: formik.values.date,
          start: formik.values.startTime,
          end: formik.values.endTime,
        }),
      ).then((response) => {
        if (response.type === "putEditShift/fulfilled") {
          toast.success("Shift Edited Successfully");
          handleClose();
          dispatch(getProviderShift({ region: "all" }));
        }
      });
    } else if (accountType === "physician") {
      dispatch(
        putMyScheduleEdit({
          shift_id: myScheduleViewShiftData.shift_id,
          region: formik.values.searchRegion,
          shift_date: formik.values.date,
          start: formik.values.startTime,
          end: formik.values.endTime,
          repeat_days: formik.values.repeatDays,
          repeat_end: formik.values.repeatEnd,
        }),
      )
        .then((response) => {
          if (response.type === "putMyScheduleEdit/fulfilled") {
            toast.success("Shift Edited Successfully");
            handleClose();
            dispatch(getMySchedule());
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="View Shift"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <FormInput
            fullWidth
            name="searchRegion"
            disabled
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
                <MenuItem key={index} value={region.region_name}>
                  {region.region_name}
                </MenuItem>
              );
            })}
          </FormInput>
          {accountType === "admin" && (
            <FormInput
              name="physician"
              fullWidth
              disabled
              label="Select Physician"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.physician}
              error={
                formik.touched.physician && Boolean(formik.errors.physician)
              }
              helperText={formik.touched.physician && formik.errors.physician}
            />
          )}
          <Grid container gap={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormInput
                type="date"
                disabled={isDisabled}
                fullWidth
                name="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Grid>
            {/* <Grid item xs={6}> */}
            {/* </Grid> */}
          </Grid>
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Input
              name="startTime"
              disabled={isDisabled}
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
              disabled={isDisabled}
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
          {!checkShift(formik.values.date) ? (
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                name="Return"
                variant="contained"
                onClick={() => {
                  if (accountType === "admin") {
                    dispatch(putReturnShift(viewShiftData.shift_id)).then(
                      (response) => {
                        if (response.type === "putReturnShift/fulfilled") {
                          toast.success("Status Update Successfully");
                          handleClose();
                          dispatch(getProviderShift({ region: "all" }));
                        }
                      },
                    );
                  } else {
                    dispatch(
                      putReturnShift(myScheduleViewShiftData.shift_id),
                    ).then((response) => {
                      if (response.type === "putReturnShift/fulfilled") {
                        toast.success("Status Update Successfully");
                        handleClose();
                        dispatch(getMySchedule());
                      }
                    });
                  }
                }}
              />
              <Button
                name={isDisabled ? "Edit" : "Save"}
                onClick={
                  isDisabled ? () => setIsDisabled(false) : () => handleSave()
                }
              />
              <Button
                name="Delete"
                variant="contained"
                color="error"
                onClick={() => {
                  if (accountType === "admin") {
                    dispatch(deleteShift(viewShiftData.shift_id)).then(
                      (response) => {
                        if (response.type === "deleteShift/fulfilled") {
                          toast.success("shift Deleted Successfully");
                          setIsDisabled(true);
                          handleClose();
                          dispatch(getProviderShift({ region: "all" }));
                        }
                      },
                    );
                  } else {
                    dispatch(
                      deleteShift(myScheduleViewShiftData.shift_id),
                    ).then((response) => {
                      if (response.type === "deleteShift/fulfilled") {
                        toast.success("shift Deleted Successfully");
                        setIsDisabled(true);
                        handleClose();
                        dispatch(getMySchedule());
                      }
                    });
                  }
                }}
              />
            </Box>
          ) : null}
        </Box>
      </form>
    </BasicModal>
  );
};

export default ViewShift;
