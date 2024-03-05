import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constant/route";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Account from "../myProfile/components/Account";
import Address from "../myProfile/components/Address";
import PhysiciansInformation from "../myProfile/components/PhysiciansInformation";
import ProvideProfile from "../myProfile/components/ProvideProfile";
import "./editAccount.css";

const EditAccount = () => {
  return (
    <>
      <Box className="edit-main-container">
        <Container maxWidth="md" className="edit-main-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>Edit Physician Account</b>
              </Typography>
            </Box>
            <Link to={AppRoutes.PROVIDER}>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                className="form-btn"
              />
            </Link>
          </Box>
          <Paper className="edit-full-paper">
            {/* .................................................Account Information....................................... */}
            <Account />
            {/* ................................................Physician Information...................................... */}
            <PhysiciansInformation />
            {/* ..............................................Address Information........................................... */}
            <Address />
            {/* .......................................Provider Profile.................................. */}
            <ProvideProfile />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EditAccount;
