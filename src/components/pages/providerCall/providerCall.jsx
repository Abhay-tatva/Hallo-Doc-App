import React, { useEffect } from "react";
import "./providerCall.css";
import { Container } from "@mui/system";
import { Box, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import { AppRoutes } from "../../../constant/route";
import { useSelector, useDispatch } from "react-redux";
import { flower, mountain } from "../../assests/images";
import { getProviderOnCall } from "../../../redux/Scheduling/schedulingApi";

const ProviderCall = () => {
  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const dispatch = useDispatch();

  const { providerOnCalls, providerOffDuties } = useSelector(
    (state) => state.root.schedulingReducer,
  );
  useEffect(() => {
    dispatch(getProviderOnCall());
  }, [dispatch]);
  return (
    <>
      <Box className="call-main-container">
        <Container maxWidth="lg" className="call-conatiner-wrapper">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>MDs On Call</b>
              </Typography>
            </Box>
            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <FormInput
              className="search-text drop-list"
              select
              placeholder="All Regions"
              //   value={additionalFilter}
              //   onChange={handleAdditionalFilterChange}
              //   InputProps={{
              //     startAdornment: (
              //       <InputAdornment position="start">
              //         <SearchOutlinedIcon />
              //       </InputAdornment>
              //     ),
              //   }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {regions.map((region, index) => {
                return (
                  <MenuItem key={index} value={region.region_name}>
                    {region.region_name}
                  </MenuItem>
                );
              })}
            </FormInput>
            <Box display="flex" gap={2}>
              <Button
                name="Calendar View"
                // onClick={() => navigate(AppRoutes.PROVIDERCALL)}
              ></Button>
              <Button
                name="Shifts For Review"
                onClick={() => navigate(AppRoutes.REQUESTED_SHIFTS)}
              ></Button>
            </Box>
          </Box>
          <Paper className="call-container">
            <Grid container spacing={{ xs: 2, md: 2 }} className="grid">
              <Grid item xs={12} md={4}>
                <Typography>
                  <b>MDs On call</b>
                </Typography>
              </Grid>

              {providerOnCalls?.map((providerOnCall) => (
                <Grid key={providerOnCall.user_id} item xs={12} md={4}>
                  <Box display="flex">
                    <img src={flower} alt="user" height={70} />
                    {`${providerOnCall.provider_name} ${providerOnCall.type_of_user}`}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box className="physicians">
              <Typography>
                <b>Physicians Off Duty</b>
              </Typography>
              <Grid container spacing={{ xs: 1, md: 2 }} className="grid">
                <Grid item xs={12} md={4}>
                  <Box display="flex">
                    <Typography>Dr Brown</Typography>
                    <img src={mountain} height="80px" />
                    {providerOffDuties?.map((providerOffDutie) => (
                      <Grid key={providerOffDutie.user_id} item xs={12} md={4}>
                        <Box display="flex">
                          <img src={mountain} alt="user" height={70} />
                          {`${providerOffDutie.provider_name} ${providerOffDutie.type_of_user}`}
                        </Box>
                      </Grid>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProviderCall;
