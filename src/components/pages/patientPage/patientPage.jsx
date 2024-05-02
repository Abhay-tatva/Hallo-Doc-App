import { Box } from "@mui/material";
import React from "react";
import Patient1 from "../../assests/images/patient.png";
import "./patientPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Button/ButtonInput";
import { AppRoutes } from "../../../constant/route";

const PatientPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap="wrap"
      gap={5}
      pt={10}
    >
      <img src={Patient1} alt="headingImg" />
      <Box display="flex" flexDirection="column" gap={5} pt={2}>
        <Button
          name="Submit A Request"
          className="patientpage"
          onClick={() => navigate(AppRoutes.SUBMITREQUEST)}
        />
        <Button
          name="Registered Patients"
          color="info"
          className="patientpage"
          onClick={() => navigate(AppRoutes.LOGIN)}
        />
      </Box>
      <Box pt={50}>
        <Link to="#">Terms of Conditions</Link>
        <Box component="span"> | </Box>
        <Link to="#">Privacy Policy</Link>
      </Box>
    </Box>
  );
};

export default PatientPage;
