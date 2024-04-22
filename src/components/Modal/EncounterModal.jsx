/* eslint-disable camelcase */

import React from "react";
import Modal from "./Modal";
import { Box, Typography } from "@mui/material";
import { Button } from "../Button/ButtonInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDownload } from "../../redux/Provider Site/Encounter/encounterApi";

const EncounterModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { confirmation_no } = useSelector((state) => state.root.commonReducer);

  const handleDownload = () => {
    console.log("Confirmation Number:", confirmation_no);
    dispatch(getDownload(confirmation_no))
      .then((response) => {
        console.log("Download Response:", response);
        if (response.type === "getDownload/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/pdf",
          });
          console.log("Blob Created:", blob);

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `Fullform.pdf`);
            toast.success("File downloaded successfully");
          } else {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `Fullform.pdf`;
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
            toast.success("File downloaded successfully");
          }
        } else {
          toast.error("No files selected!");
        }
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        toast.error("Error downloading file:", error);
      });
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose} header="Encounter Form">
      <Typography p={2}>Encounter form is finalize successfully</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={2}
        pb={4}
      >
        <Button name="Download" onClick={handleDownload} />
      </Box>
    </Modal>
  );
};

export default EncounterModal;
