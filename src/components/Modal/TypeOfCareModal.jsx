/* eslint-disable camelcase */

import React, { useState } from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { typeOfCare } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/encounterAPI";
// import { getProviderDashboardCount } from "../../redux/halloAPIs/providerAPIs/dashboardAPIs/getProviderDashboardCount";
import { Button } from "../Button/ButtonInput";
import { useDispatch, useSelector } from "react-redux";
import { putTypeOfCare } from "../../redux/Provider Site/Encounter/encounterApi";
import { physicianCount } from "../../redux/Provider Site/countApi/countApi";

const TypeOfCareModal = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const dispatch = useDispatch();
  //   const { id } = useSelector((state) => state.root.patientName);
  const state = useSelector((state) => state.root.newStateReducer);
  const rows = state?.data?.data?.[0];

  return (
    <Modal open={open} handleClose={handleClose} header="Select Type Of Care">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        pt={4}
      >
        <Button
          name="housecall"
          variant={selectedType === "housecall" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("housecall")}
        />
        <Button
          name="consult"
          variant={selectedType === "consult" ? "contained" : "outlined"}
          size="large"
          onClick={() => setSelectedType("consult")}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        p={4}
      >
        <Button
          name="Save"
          onClick={() => {
            dispatch(
              putTypeOfCare({
                confirmation_no: rows.confirmation_no,
                type_of_care: selectedType,
              }),
            ).then((response) => {
              if (response.type === "putTypeOfCare/fulfilled") {
                dispatch(physicianCount());
                handleClose();
              }
            });
          }}
        />
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

export default TypeOfCareModal;
