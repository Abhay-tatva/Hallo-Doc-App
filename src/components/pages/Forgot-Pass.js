import React from "react";
import { useFormik } from "formik";
import { Typography, Grid, InputAdornment } from "@mui/material";
import Docimg from "../assests/images/doctor.jpg";
import Patient1 from "../assests/images/patient.png";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppRoutes } from "../../constant/route";
import { FormInput } from "../TextField/FormInput";
import { Link } from "react-router-dom";
import { Button } from "../Button/ButtonInput";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ForgotPassSchema } from "../ValidationSchema/index";
import { useDispatch } from "react-redux";
import { forgotPass } from "../../redux/forgotSlice/forgotApi";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPassSchema,
    onSubmit: (values) => {
      dispatch(forgotPass(values)).then((response) => {
        console.log(response);
        if (response.type === "forgotPass/fulfilled") {
          toast.success("You are login Successfully");
          // navigate(AppRoutes.DASHBOARD);
        } else {
          toast.error("Invalid email or password");
        }
      });

      console.log("Form submitted", values);
    },
  });

  return (
    // <Container className="container">
    <Grid container spacing={2} height="100vh">
      <Grid item xs={12} md={6} className="image-container">
        <img src={Docimg} alt="doctor.jpg" style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={12} md={6} className="form-container">
        <div className="blur-image"></div>
        <div className="wrapper-container">
          <div className="hallodoc-logo">
            <img src={Patient1} alt="patient.jpg" />
          </div>
          <div className="text">
            <Typography variant="h4" align="center">
              Forgot Your Password
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit} className="form-page">
            <FormInput
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="form-group"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              className="btn"
              name="Reset your Password"
              type="submit"
              fullWidth
              size="large"
            />
          </form>
          {/* <Box > */}
          <div className="link">
            <Link to={AppRoutes.LOGIN}>
              <ArrowBackIosIcon />
              Back To Login
            </Link>
          </div>
          {/* </Box> */}
          <div className="footer-links">
            <Link to="#" sx={{ mr: "10px" }}>
              Terms of Conditions
            </Link>
            |
            <Link to="#" sx={{ ml: "10px" }}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
    // </Container>
  );
};

export default ForgotPasswordPage;
