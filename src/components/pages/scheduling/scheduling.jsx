/* eslint-disable camelcase */

import {
  Box,
  Container,
  InputAdornment,
  // IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../../TextField/FormInput";
import "./scheduling.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { AppRoutes } from "../../../constant/route";
import CreateShift from "../../Modal/CreateShift";
import ViewShift from "../../Modal/ViewShift";
import {
  getProviderShift,
  getViewShift,
} from "../../../redux/Scheduling/schedulingApi";

const Scheduling = () => {
  const navigate = useNavigate();
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [open, setOpen] = React.useState(false);
  const [modalName, setModalName] = useState("");
  const dispatch = useDispatch();

  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  //   const { accountType } = useSelector((state) => state.root.loginReducer);

  const { providerShift } = useSelector(
    (state) => state.root.schedulingReducer,
  );
  console.log("provider shift", providerShift);
  useEffect(() => {
    dispatch(getProviderShift({ region: additionalFilter }));
  }, [dispatch, additionalFilter]);

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };
  const handleAdditionalFilterChange = (event) => {
    setAdditionalFilter(event.target.value);
  };

  const events = providerShift
    ?.map((provider) => {
      return provider.shifts.map((shift) => {
        return {
          id: shift.shift_id,
          title: `Shift ID: ${shift.shift_id}`,
          start: `${shift.shift_date}T${shift.start}`,
          end: `${shift.shift_date}T${shift.end}`,
          resourceId: provider.user_id,
          backgroundColor:
            shift.status === "pending" ? "lightpink" : "lightgreen",
        };
      });
    })
    .flat();
  const resources = providerShift?.map((shift) => ({
    id: shift?.user_id,
    title: `${shift?.provider_name}`,
  }));

  return (
    <>
      <Box className="main-scheduling-container">
        <Container maxWidth="lg" className="scheduling-conatiner-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>Scheduling</b>
              </Typography>
            </Box>
            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <FormInput
              className="search-text drop-list"
              select
              placeholder="All Regions"
              value={additionalFilter}
              onChange={handleAdditionalFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {regions.map((region, index) => {
                return (
                  <MenuItem key={index} value={region.region_name}>
                    {region.region_name}
                  </MenuItem>
                );
              })}
            </FormInput>
            <Box display="flex" gap={2}>
              <Button
                name="Provider on call"
                onClick={() => navigate(AppRoutes.PROVIDERCALL)}
              ></Button>
              <Button
                name="Shifts For Review"
                onClick={() => navigate(AppRoutes.REQUESTED_SHIFTS)}
              ></Button>
              <Button
                name="Add New Shift"
                onClick={() => handleOpen("Create Shift")}
              ></Button>
            </Box>
          </Box>
          <Box className="calendar">
            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Box className="indicators_scheduling pending" />
              Pending Shifts
              <Box className="indicators_scheduling approved" />
              Approved Shifts
            </Box>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                resourceTimelinePlugin,
              ]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "title prev next",
                right: "resourceTimelineDay resourceTimelineWeek dayGridMonth",
              }}
              events={events}
              resources={resources}
              eventContent={(eventInfo) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: eventInfo.backgroundColor,
                      borderRadius: "0.3rem",
                      cursor: "pointer",
                      height: "auto",
                    }}
                    onClick={() => {
                      dispatch(getViewShift(eventInfo.event.id));
                      handleOpen("View Shift");
                    }}
                  >
                    {eventInfo.timeText}
                  </div>
                );
              }}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
            />
          </Box>
        </Container>
      </Box>
      <CreateShift
        open={open && modalName === "Create Shift"}
        handleClose={handleClose}
      />
      <ViewShift
        open={open && modalName === "View Shift"}
        handleClose={handleClose}
      />
    </>
  );
};

export default Scheduling;
