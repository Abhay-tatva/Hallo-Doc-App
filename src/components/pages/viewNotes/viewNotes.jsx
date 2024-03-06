import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import "./viewNotes.css";
import { FormInput } from "../../TextField/FormInput";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import PersonIcon from "@mui/icons-material/Person";
import Person4Icon from "@mui/icons-material/Person4";
import Footer from "../../Footer/Footer";
import { useFormik } from "formik";
import { viewNotesSchema } from "../../ValidationSchema/index";

const ViewNotes = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      adminNotes: "",
    },
    validationSchema: viewNotesSchema,
    onSubmit: (values) => {
      console.log("submmitted", values);
    },
  });
  return (
    <>
      <Box className="view-notes-container">
        <Container maxWidth="md">
          <Box display="flex" justifyContent="space-between" mb="8px">
            <Box display="flex">
              <Typography variant="h5" gutterBottom>
                <b>Notes</b>
              </Typography>
              {/* <span className="patient-btn">Patient</span> */}
            </Box>
            {/* <Link to={AppRoutes.RESERVATION}> */}
            <Button
              name="back"
              variant="outlined"
              startIcon={<ArrowBackIosOutlinedIcon />}
              color="primary"
              className="form-btn"
              onClick={() => navigate(-1)}
            />
            {/* </Link> */}
          </Box>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper className="transfer-notes">
                <Box>
                  <WifiProtectedSetupIcon />
                </Box>
                <Box>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <b>Transfer Notes</b>
                  </Typography>
                  <Typography variant="caption">
                    Admin Transferred to Dr.AGOLA on 27/09/2023 at 9:38:04 AM:
                    test assign
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="transfer-notes">
                <Box>
                  <PersonIcon />
                </Box>
                <Box>
                  <Typography>
                    <b>Physician Notes</b>
                  </Typography>
                  <Typography>test add, concluded </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className="transfer-notes">
                <Box>
                  <Person4Icon />
                </Box>
                <Box>
                  <Typography>
                    <b>Admin Notes</b>
                  </Typography>
                  <Typography>-</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <form>
                <Paper className="patient-notes-box">
                  <FormInput
                    name="adminNotes"
                    label="Admin Notes"
                    multiline
                    rows={5}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.adminNotes}
                    error={
                      formik.touched.adminNotes &&
                      Boolean(formik.errors.adminNotes)
                    }
                    helperText={
                      formik.touched.adminNotes && formik.errors.adminNotes
                    }
                  />
                  <Box className="save-change">
                    <Button
                      name="savechanges"
                      variant="contained"
                      className="form-btn viewbtn"
                    />
                  </Box>
                </Paper>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ViewNotes;
