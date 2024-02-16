import { Box } from "@mui/system";
import React from "react";
import "./dashboardmain.css";

const Dashboardmain = () => {
  return (
    <Box className="dashboard-main">
      <ul>
        <li>Dashboard</li>
        <li>Provider Location</li>
        <li>My Profile</li>
        <li>Providers</li>
        <li>Access</li>
        <li>Records</li>
      </ul>
    </Box>
  );
};

export default Dashboardmain;
