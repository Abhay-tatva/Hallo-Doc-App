/* eslint-disable camelcase */

import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Button } from "../Button/ButtonInput";
import { info } from "../assests/images";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCase } from "../../redux/clearCase/clearCaseApi";
import { requestCount } from "../../redux/requestCount/requestCountApi";
import { toast } from "react-toastify";

const ClearCaseModal = ({ open, handleClose, handleOpen, rowId }) => {
  const dispatch = useDispatch();
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);

  const handleClearButtonClick = () => {
    dispatch(clearCase(confirmation_no)).then((response) => {
      if (response.type === "clearCase/fulfilled") {
        toast.success("Case Clear successfully...");

        dispatch(requestCount());
        handleClose();
      }
    });
  };
  return (
    <Modal open={open} handleOpen={handleOpen}>
      <Box
        className="modal-container"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={7}
      >
        <img src={info} alt="alert info" width={100} height={100} />
        <Typography variant="h5" mt={3}>
          Confirmation for clear case
        </Typography>
        <Typography variant="body2" mt={3}>
          Are sure you want to clear this request? Once clear this request then
          you are not able to see this request
        </Typography>
        <Box display="flex" gap={2} mt={5}>
          <Button
            name="Clear"
            variant="contained"
            onClick={handleClearButtonClick}
          />
          <Button name="Cancel" variant="outlined" onClick={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ClearCaseModal;
