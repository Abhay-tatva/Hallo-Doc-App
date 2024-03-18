import {
  Box,
  Container,
  InputAdornment,
  // IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormInput } from "../../TextField/FormInput";
import "./scheduling.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { AppRoutes } from "../../../constant/route";

const Scheduling = () => {
  const navigate = useNavigate();
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleAdditionalFilterChange = (event) => {
    setAdditionalFilter(event.target.value);
  };
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
              <Button name="Provider on call"></Button>
              <Button
                name="Shifts For Review"
                onClick={() => navigate(AppRoutes.REQUESTED_SHIFTS)}
              ></Button>
              <Button name="Add New Shift"></Button>
            </Box>
          </Box>
          <Box className="calendar">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                // interactionPlugin,
                // timeGridPlugin,
                resourceTimelinePlugin,
              ]}
              dateClick={handleDateClick}
              initialView="resourceTimelineWeek"
              headerToolbar={{
                left: "title prev next",
                right: "resourceTimelineDay resourceTimelineWeek dayGridMonth",
              }}
              events={[
                { title: "event 1", date: "2024-03-15" },
                { title: "event 2", date: "2019-04-02" },
              ]}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Scheduling;
