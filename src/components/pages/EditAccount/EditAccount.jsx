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
import { useSelector } from "react-redux";
// import { deleteProvider } from "../../../redux/provider/providerApi";
// import { useNavigate } from "react-router-dom";

const EditAccount = () => {
  const { physicianData } = useSelector(
    (state) => state.root.providerMenuReducer,
  );
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
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
  } = data.physician_information;
  const { address_1, address_2, city, state, zip, billing_mobile_no } =
    data.mailing_billing_information;
  const { business_name, business_website, admin_notes } =
    data.provider_profile;
  const { regions } = service_areas_availability ?? {};
  const { documents } = data.onboarding;

  const IndeDoc = documents.filter(
    (document) => document.document_name === "independent_contractor_agreement",
  );
  const bgCheck = documents.filter(
    (document) => document.document_name === "background_check",
  );
  const hippa = documents.filter(
    (document) => document.document_name === "HIPAA",
  );
  const nonDisclosure = documents.filter(
    (document) => document.document_name === "non_disclosure",
  );
  const licenceDocument = documents.filter(
    (document) => document.document_name === "licence_document",
  );

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
              mobileNo={mobile_no?.toString()}
              medicalLicence={medical_licence}
              npiNumber={NPI_number?.toString()}
              synchronizationEmail={synchronization_email}
              regions={regions}
            />
            {/* ..............................................Address Information........................................... */}
            <Address
              userId={data.user_id}
              name="providerProfile"
              add1={address_1}
              add2={address_2}
              city={city}
              state={state}
              zip={zip}
              billNumber={billing_mobile_no?.toString()}
            />
            {/* .......................................Provider Profile.................................. */}
            <ProvideProfile
              userId={data.user_id}
              businessName={business_name}
              businessWebsite={business_website}
              adminNotes={admin_notes}
            />
            <Divider sx={{ backgroundColor: "black" }} />
            {/* ........................................On boarding........................................................ */}
            <OnBording
              userId={data.user_id}
              contractAgree={IndeDoc?.[0]}
              bgCheck={bgCheck?.[0]}
              hippa={hippa?.[0]}
              nonDisclosure={nonDisclosure?.[0]}
              licenceDocument={licenceDocument?.[0]}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default EditAccount;
