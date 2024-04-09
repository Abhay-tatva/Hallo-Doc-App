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
import { AppRoutes } from "../../constant/route";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/ButtonInput";
import { LoginSchema } from "../ValidationSchema/index";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { userLogin } from "../../redux/loginApi/loginApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.root.loginReducer);

  const onSubmit = (values) => {
    dispatch(userLogin(values)).then((response) => {
      if (response.type === "userLogin/fulfilled") {
        toast.success("You are login Successfully");
        navigate(AppRoutes.DASHBOARD);
      } else {
        toast.error("Invalid email or password");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

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
              id="email"
              label="email"
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
