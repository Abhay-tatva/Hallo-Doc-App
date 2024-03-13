import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Button } from "../../Button/ButtonInput";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constant/route";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import "./myProfile.css";
import Account from "./components/Account";
import Administrator from "./components/Administrator";
import Address from "./components/Address";
const MyProfile = () => {
  return (
    <>
      <Box className="main-profile-container">
        <Container maxWidth="md" className="profile-container-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>My Profile</b>
              </Typography>
            </Box>
            <Link to={AppRoutes.DASHBOARD}>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                className="form-btn"
              />
            </Link>
          </Box>

          <Paper className="profile-full-paper">
            {/* ............................/ Account Information............  */}

            <Account />
            {/* ............................/ Administration Information............  */}
            <Administrator />

            {/* .............................Mailing and biling Information......................... */}
            <Address />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
