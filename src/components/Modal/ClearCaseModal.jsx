import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Button } from "../Button/ButtonInput";
import { info } from "../assests/images";
import "./modal.css";

const ClearCaseModal = ({
  open,
  handleClose,
  handleOpen,
  handleClear,
  rowId,
}) => {
  const handleClearButtonClick = () => {
    handleClear(rowId);
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
