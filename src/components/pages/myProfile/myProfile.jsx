/* eslint-disable camelcase */
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
  // const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.root.myProfileReducer);
  // const { physicianData } = useSelector(
  //   (state) => state.root.providerMenuReducer,
  // );

  const { username, status, role } = data.admin_account_information;
  const { firstname, lastname, email, mobile_no, regions } =
    data.admin_administrator_information;
  const { address_1, address_2, city, state, zip, billing_mobile_no } =
    data.admin_mailing_billing_information;

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
              name="myProfile"
              userName={username}
              status={status}
              role={role}
              userId={data?.admin_user_id}
            />
            {/* ............................/ Administration Information............  */}
            <Administrator
              userId={data?.admin_user_id}
              firstName={firstname}
              lastName={lastname}
              email={email}
              mobileNo={mobile_no}
              regions={regions}
            />

            {/* .............................Mailing and biling Information......................... */}
            <Address
              name="myProfile"
              userId={data?.admin_user_id}
              add1={address_1}
              add2={address_2}
              city={city}
              state={state}
              zip={zip}
              billNumber={billing_mobile_no}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
