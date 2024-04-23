import React from "react";
import { Box, Container, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import "./submitRequest.css";
import { Button } from "../../Button/ButtonInput";
import { AppRoutes } from "../../../constant/route";

const SubmitRequest = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pt={5}
          gap={3}
        >
          <Box
            display="flex"
            justifyContent="center"
            gap={{ md: 5, sm: 4, xs: 1.5 }}
            sx={{ width: "100%" }}
          >
            <Typography variant="h4" ml={{ md: 30, sm: 15, xs: 3 }}>
              <b>I am a ...</b>
            </Typography>
            <Box ml={{ md: 15, sm: 7.5, xs: 2 }}>
              <Button
                name="Back"
                variant="outlined"
                startIcon={<ArrowBackIosNewOutlinedIcon />}
                color="primary"
                onClick={() => navigate(-1)}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              name="Patient"
              color="primary"
              variant="outlined"
              onClick={() => navigate(AppRoutes.PATIENTCREATE)}
              className="submit-request-btn"
            />
            <Button
              name="Family/Friend"
              color="secondary"
              variant="outlined"
              onClick={() => navigate(AppRoutes.CREATEFAMILFRIEND)}
              className="submit-request-btn"
            />
            <Button
              name="Concierge"
              color="success"
              variant="outlined"
              onClick={() => navigate(AppRoutes.CONCIERGE)}
              className="submit-request-btn"
            />
            <Button
              name="Business Partner"
              color="error"
              variant="outlined"
              onClick={() => navigate(AppRoutes.BUSINESS)}
              className="submit-request-btn"
            />
          </Box>
        </Box>
      </Container>
      <Box position="fixed" bottom={0} minWidth="100%">
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default SubmitRequest;
