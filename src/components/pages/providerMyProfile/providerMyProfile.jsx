/* eslint-disable camelcase */
import React, { useState } from "react";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { Button } from "../../Button/ButtonInput";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constant/route";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import "./providerMyProfile.css";
import { useSelector } from "react-redux";
import Account from "../myProfile/components/Account";
import PhysiciansInformation from "../myProfile/components/PhysiciansInformation";
import Address from "../myProfile/components/Address";
import ProvideProfile from "../myProfile/components/ProvideProfile";
import OnBording from "../myProfile/components/onBoarding";
import RequestToAdmin from "../../Modal/requestToAdminModal";

const ProviderMyProfile = () => {
  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState("");

  // const [rowId, setRowId] = useState(null);

  const navigate = useNavigate();
  //   const { accountType } = useSelector((state) => state.root.loginReducer);

  const { myProfilePhysicianData } = useSelector(
    (state) => state.root.physicanMyProfileReducer,
  );

  const handleOpen = (name) => {
    setModalName(name);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  const { username } = myProfilePhysicianData.provider_account_information;
  const {
    firstname,
    medical_licence,
    NPI_number,
    lastname,
    email,
    mobile_no,
    regions,
  } = myProfilePhysicianData.physician_information;

  const { business_name, business_website } =
    myProfilePhysicianData.provider_profile;

  const { address_1, address_2, city, state, zip, billing_mobile_no } =
    myProfilePhysicianData.mailing_billing_information;

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
            <Box display="flex" justifyContent="flex-end" pb={3}>
              <Button
                name="Request To Admin"
                variant="outlined"
                onClick={() => handleOpen("Request To Admin")}
              />
            </Box>
            {/* ............................/ Account Information............  */}
            <Account name="myProfile" userName={username} />
            {/* ............................/ Administration Information............  */}
            <PhysiciansInformation
              userId={myProfilePhysicianData?.user_id}
              firstName={firstname}
              lastName={lastname}
              email={email}
              mobileNo={mobile_no}
              medicalLicence={medical_licence}
              npiNumber={NPI_number?.toString()}
              regions={regions}
              // synchronizationEmail={synchronization_email}
              // serviceAreasAvailability={service_areas_availability}
              // districtOfColumbia={district_of_columbia}
              // newYork={new_york}
            />
            {/* .............................Mailing and biling Information......................... */}
            <Address
              name="myProfile"
              add1={address_1}
              add2={address_2}
              city={city}
              state={state}
              zip={zip}
              billNo={billing_mobile_no}
            />
            <>
              <ProvideProfile
                businessName={business_name}
                businessWebsite={business_website}
                // adminNotes={admin_notes}
              />
              <Divider sx={{ backgroundColor: "black" }} />
              <OnBording />
            </>
          </Paper>
        </Container>
      </Box>
      <RequestToAdmin
        open={open && modalName === "Request To Admin"}
        handleClose={handleClose}
        handleOpen={modalName === "Request To Admin" ? handleOpen : null}
      />
    </>
  );
};

export default ProviderMyProfile;
