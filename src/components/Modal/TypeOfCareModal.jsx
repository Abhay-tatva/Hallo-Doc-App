/* eslint-disable camelcase */

import React, { useState } from "react";
import Modal from "./Modal";
import { Box } from "@mui/material";
import { Button } from "../Button/ButtonInput";
import { useDispatch, useSelector } from "react-redux";
import { putTypeOfCare } from "../../redux/Provider Site/Encounter/encounterApi";
import { physicianCount } from "../../redux/Provider Site/countApi/countApi";

const TypeOfCareModal = ({ open, handleClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const dispatch = useDispatch();
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);

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
                confirmation_no,
                type_of_care: selectedType,
              }),
            ).then((response) => {
              if (response.type === "putTypeOfCare/fulfilled") {
                dispatch(physicianCount());
                handleClose();
                setSelectedType("");
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
