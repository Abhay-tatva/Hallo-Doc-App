import {
  Box,
  Container,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormInput } from "../../TextField/FormInput";
import "./scheduling.css";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const Scheduling = () => {
  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);

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
              //   value={additionalFilter}
              //   onChange={handleAdditionalFilterChange}
              //   InputProps={{
              //     startAdornment: (
              //       <InputAdornment position="start">
              //         <SearchOutlinedIcon />
              //       </InputAdornment>
              //     ),
              //   }}
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
              <Button name="Shifts For Review"></Button>
              <Button name="Add New Shift"></Button>
            </Box>
          </Box>
          <Typography variant="h5" gutterBottom marginTop={4}>
            <b>Monday, Dec 4, 2023 </b>
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <span className="patient-btn"></span>
              <Typography variant="subtitle2">Pending Shifts</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <span className="patient-btn"></span>
              <Typography variant="subtitle2">Approved Shifts</Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              mt={5}
            >
              <IconButton
                size="medium"
                sx={{ backgroundColor: "aqua", borderRadius: "50%" }}
              >
                <KeyboardArrowLeftOutlinedIcon />
              </IconButton>
              <CalendarMonthOutlinedIcon />
              <IconButton
                size="medium"
                sx={{ backgroundColor: "aqua", borderRadius: "50%" }}
              >
                <ChevronRightOutlinedIcon />
              </IconButton>
            </Box>
            <Box
              display="flex"
              gap={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button name="Day"></Button>
              <Button name="Week"></Button>
              <Button name="Month"></Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Scheduling;
