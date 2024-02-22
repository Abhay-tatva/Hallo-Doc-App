import React from "react";
import { useFormik } from "formik";
import { Typography, Grid, InputAdornment, IconButton } from "@mui/material";
import Docimg from "../assests/images/doctor.jpg";
import Patient1 from "../assests/images/patient.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { FormInput } from "../TextField/FormInput";
import { AppRoutes } from "../constant/route";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/ButtonInput";
import { useAuth } from "../../auth";
import { LoginSchema } from "../ValidationSchema/validationSchema";


const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      auth.login(values.username);
      navigate(AppRoutes.DASHBOARD, { replace: true });
      console.log("Form submitted", values);
    },
  });
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
  );
};

export default LoginPage;
