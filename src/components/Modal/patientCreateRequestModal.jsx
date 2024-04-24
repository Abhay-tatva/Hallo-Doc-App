/* eslint-disable camelcase */

import React, { useState } from "react";
import Modal from "./Modal";
import { Box, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { typeOfCare } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
// import { getProviderDashboardCount } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/getProviderDashboardCount";
import { Button } from "../Button/ButtonInput";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constant/route";
// import { useDispatch } from "react-redux";

const PatientCreateRequest = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  //   const { id } = useSelector((state) => state.root.patientName);
  //   const state = useSelector((state) => state.root.newStateReducer);
  //   const rows = state?.data?.data?.[0];

  const handleContinue = () => {
    if (selectedType === "Me") {
      navigate(AppRoutes.MESUBMIT);
    } else if (selectedType === "Some One Else") {
      navigate(AppRoutes.SOMEONEELSE);
    }
  };
  return (
    <Modal open={open} handleClose={handleClose} header="Create New Request">
      <Typography p={2}>Here, I want to create new request for...</Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        pt={4}
      >
        <Button
          name="Me"
          variant={selectedType === "Me" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("Me")}
        />
        <Button
          name="Some One Else"
          variant={selectedType === "Some One Else" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("Some One Else")}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        p={4}
      >
        <Button name="Continue" onClick={handleContinue} />
        <Button
          name="Cancel"
          variant="outlined"
          onClick={() => {
            setSelectedType("");
            handleClose();
          }}
        />
      </Box>
    </Modal>
  );
};

export default PatientCreateRequest;
