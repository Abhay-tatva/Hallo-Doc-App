/* eslint-disable camelcase */

import { Box, Container, Divider, Paper, Typography } from "@mui/material";
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
import OnBording from "../myProfile/components/onBoarding";
import { useSelector, useDispatch } from "react-redux";
import { deleteProvider } from "../../../redux/provider/providerApi";
import { useNavigate } from "react-router-dom";

const EditAccount = () => {
  const { physicianData } = useSelector(
    (state) => state.root.providerMenuReducer,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = physicianData;
  const { username, status, role } = data.account_information;
  const {
    firstname,
    lastname,
    email,
    mobile_no,
    medical_licence,
    NPI_number,
    synchronization_email,
    service_areas_availability,
    district_of_columbia,
    new_york,
  } = data.physician_information;
  const { address_1, address_2, city, state, zip, billing_mobile_no } =
    data.mailing_billing_information;
  const { business_name, business_website, admin_notes } =
    data.provider_profile;
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
            <Account
              name="providerProfile"
              userId={data.user_id}
              userName={username}
              status={status}
              role={role}
            />
            {/* ................................................Physician Information...................................... */}
            <PhysiciansInformation
              userId={data.user_id}
              firstName={firstname}
              lastName={lastname}
              email={email}
              mobileNo={mobile_no}
              medicalLicence={medical_licence}
              npiNumber={NPI_number}
              synchronizationEmail={synchronization_email}
              serviceAreasAvailability={service_areas_availability}
              districtOfColumbia={district_of_columbia}
              newYork={new_york}
            />
            {/* ..............................................Address Information........................................... */}
            <Address
              userId={data.user_id}
              name="providerProfile"
              add1={address_1}
              add2={address_2}
              city={city}
              state={state}
              Zip={zip}
              billNo={billing_mobile_no}
            />
            {/* .......................................Provider Profile.................................. */}
            <ProvideProfile
              businessName={business_name}
              businessWebsite={business_website}
              adminNotes={admin_notes}
            />
            <Divider sx={{ backgroundColor: "black" }} />
            {/* ........................................On boarding........................................................ */}
            <OnBording />
            <Divider sx={{ backgroundColor: "black", marginTop: "20px" }} />
            <Box display="flex" justifyContent="end" gap={2} mt={2}>
              <Button name="save" variant="contained" />
              <Button
                name="Delete Account"
                variant="contained"
                color="error"
                mt={1}
                onClick={() => {
                  dispatch(deleteProvider(data.user_id)).then((response) => {
                    if (response.type === "deleteProvider/fulfilled") {
                      navigate(AppRoutes.PROVIDER);
                    }
                  });
                }}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EditAccount;
