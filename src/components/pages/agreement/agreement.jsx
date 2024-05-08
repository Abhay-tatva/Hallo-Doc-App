/* eslint-disable camelcase */

import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../../Button/ButtonInput";
import { useDispatch, useSelector } from "react-redux";
import { agreement } from "../../../redux/patientSite/patientDashboard/agreementApi";
import { toast } from "react-toastify";
import AgreementCancel from "../../Modal/agreementCancelModal";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constant/route";

const Agreement = () => {
  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { confirmation_no } = useSelector((state) => state.root.commonReducer);
  const handleAgree = () => {
    dispatch(agreement(confirmation_no))
      .then((response) => {
        if (response.type === "agreement/fulfilled") {
          navigate(AppRoutes.LOGIN);
          toast.success("Agreement sent successfully...");
        }
      })
      .catch((error) => {
        console.error("Error sending agreement:", error);
        toast.error("Failed to send agreement.");
      });
  };

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" gutterBottom>
          To provide the best medical service, we cannot determine the cost
          right away. If you agree to our service, we will provide care and
          follow-up until all care is completed. So with these points, if
          you&apos;d like us to provide care to you, click on &quot;Agree&quot;
          and we&apos;ll get started immediately. If you do not agree, simply
          click &quot;Cancel&quot;.
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="success" onClick={handleAgree}>
            I Agree
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpen("Agreement Cancel")}
          >
            Cancel
          </Button>
        </Box>
      </Container>
      <AgreementCancel
        open={open && modalName === "Agreement Cancel"}
        handleClose={handleClose}
        handleOpen={modalName === "Agreement Cancel" ? handleOpen : null}
      />
    </>
  );
};

export default Agreement;
