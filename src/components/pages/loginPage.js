import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Grid, InputAdornment, IconButton } from "@mui/material";
import Docimg from "../assests/images/doctor.jpg";
import Patient1 from "../assests/images/patient.png";
// import { useState, useEffect } from "react";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FormInput } from "../TextField/FormInput";
import { AppRoutes } from "../constant/route";
import { Link } from "react-router-dom";
import { Button } from "../Button/ButtonInput";
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  // const [apiData, setApiData] = useState([]);

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const response = await axios.get(
  //   fetch(
  //     "https://adminapi.staging.wymap.com.au/jobs?page=1&size=100&search=1000&filter=%7B%22durationOver3Hours%22:1,%22driverId%22:[48,322]%7D"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setApiData(data))
  //     .catch((error) => console.error("error fetching users:", error));
  // }, []);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });

  return (
    // <Container className="container">
    <Grid container spacing={2} height="100vh">
      <Grid item xs={12} md={6} className="image-container">
        <img src={Docimg} alt="doctor.jpg" style={{ width: "100%" }} />
      </Grid>
      <div className="dm-btn">
        <Button
          name={<DarkModeOutlinedIcon fontSize="large" />}
          variant="outlined"
          size="large"
        />
      </div>
      <Grid item xs={12} md={6} className="form-container">
        <div className="blur-image"></div>
        <div className="wrapper-container">
          <div className="hallodoc-logo">
            <img src={Patient1} alt="patient.jpg" />
          </div>
          <div className="text">
            <Typography variant="h4" align="center">
              Login To Your Account
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit} className="form-page">
            <FormInput
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              className="form-group"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <FormInput
              margin="normal"
              fullWidth
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className="form-group"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className=" btn"
              name="Log In"
              type="submit"
              fullWidth
              size="large"
            />
          </form>
          <div className="link">
            <Link to={AppRoutes.FORGOTPASS}>Forgot password ?</Link>
          </div>

          <div className="footer-links">
            <Link to="#" sx={{ mr: "10px" }}>
              Terms of Condition
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
    // <div>
    //   {apiData.map((user) => (
    //     <div key={apiData.id}>{user.name}</div>
    //   ))}
    // </div>
  );
};

export default LoginPage;
