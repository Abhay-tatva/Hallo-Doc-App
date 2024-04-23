import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Button } from "../Button/ButtonInput";
import { info } from "../assests/images";
// import { useDispatch } from "react-redux";

const PatientModal = ({ open, handleClose, handleOpen }) => {
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
          Information
        </Typography>
        <Typography variant="body2" mt={3}>
          When submitting a request , you must provide the correct contact
          information for the patient or the responsibly party. Failure to
          provide the correct email and phone number will delay service or be
          declined
        </Typography>
        <Box display="flex" mt={5}>
          <Button name="ok" variant="contained" onClick={handleClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientModal;
