import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Button } from "../../Button/ButtonInput";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constant/route";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import "./myProfile.css";
import Account from "./components/Account";
import Administrator from "./components/Administrator";
import Address from "./components/Address";
import { useSelector } from "react-redux";
const MyProfile = () => {
  const navigate = useNavigate();
  const state1 = useSelector((state) => state.root.myProfileReducer);
  const data = state1?.data?.data[0];
  const { username, status, role } = data.account_information;
  const {
    firstname,
    lastname,
    email,
    mobile_no,
    district_of_columbia,
    new_york,
    virginia,
    maryland,
  } = data.administrator_information;
  const { address_1, address_2, city, state, zip, billing_mobile_no } =
    data.mailing_billing_information;

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

            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              className="form-btn"
              onClick={() => navigate(AppRoutes.DASHBOARD)}
            />
          </Box>

          <Paper className="profile-full-paper">
            {/* ............................/ Account Information............  */}

            <Account
              userName={username}
              Status={status}
              Role={role}
              userId={data.user_id}
            />
            {/* ............................/ Administration Information............  */}
            <Administrator
              firstName={firstname}
              lirstName={lastname}
              Email={email}
              mobileNo={mobile_no}
              districtColumbia={district_of_columbia}
              newYyork={new_york}
              Virginia={virginia}
              Maryland={maryland}
            />

            {/* .............................Mailing and biling Information......................... */}
            <Address
              add1={address_1}
              add2={address_2}
              City={city}
              State={state}
              Zip={zip}
              billNo={billing_mobile_no}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
