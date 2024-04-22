/* eslint-disable camelcase */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./mySchedule.css";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import CreateShift from "../../Modal/CreateShift";
import {
  getMySchedule,
  getMyScheduleViewShift,
} from "../../../redux/Provider Site/mySchedule/myScheduleApi";
import ViewShift from "../../Modal/ViewShift";
// import ViewShift from "../../Modal/ViewShift";
// import { getViewShift } from "../../../redux/Scheduling/schedulingApi";

const MySchedule = () => {
  const navigate = useNavigate();
  //   const [additionalFilter, setAdditionalFilter] = useState("all");
  const [open, setOpen] = React.useState(false);
  const [modalName, setModalName] = useState("");
  const dispatch = useDispatch();

  const { myShift } = useSelector((state) => state.root.myScheduleReducer);
  useEffect(() => {
    dispatch(getMySchedule());
  }, [dispatch]);

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };
  //   const handleAdditionalFilterChange = (event) => {
  //     setAdditionalFilter(event.target.value);
  //   };

  const events = myShift
    ?.map((shift) => {
      return {
        id: shift.shift_id,
        title: `Shift ID: ${shift.shift_id}`,
        start: `${shift.shift_date}T${shift.start}`,
        end: `${shift.shift_date}T${shift.end}`,
        resourceId: shift.user_id,
        backgroundColor:
          shift.status === "pending" ? "lightpink" : "lightgreen",
      };
    })
    .flat();

  const resources = myShift?.map((shift) => ({
    id: shift?.user_id,
    title: `${shift?.shift_name}`,
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
                // right: "resourceTimelineDay resourceTimelineWeek dayGridMonth",
                center: "",
                right: "addNewShift",
              }}
              customButtons={{
                addNewShift: {
                  text: "Add New Shift",
                  click: () => handleOpen("Create Shift"),
                },
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
                      dispatch(getMyScheduleViewShift(eventInfo.event.id));
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

export default MySchedule;
