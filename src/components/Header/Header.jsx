import { Typography } from "@mui/material";
import { Button } from "../Button/ButtonInput";
import { Box } from "@mui/system";
import React from "react";
import "./header.css";
import Patient1 from "../assests/images/patient.png";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { AppRoutes } from "../constant/route";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Header = () => {
  return (
    <Box>
      <Box className="header-part">
        <Box className="img">
          <Link to={AppRoutes.LOGIN}>
            <img src={Patient1} height="77px" alt="patient.jpg"></img>
          </Link>
        </Box>
        <Box className="auth">
          <Typography>welcome here</Typography>
          <Link to={AppRoutes.LOGIN}>
            <Button name="logout" variant="outlined"></Button>
          </Link>

          <Button
            className="dark-mode"
            name={<DarkModeOutlinedIcon fontSize="large" />}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Header;
