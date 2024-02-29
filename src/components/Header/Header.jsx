import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React from "react";
import { patient } from "../assests/images";
import { Button } from "../Button/ButtonInput";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constant/route";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Menu from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice/loginSlice";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(AppRoutes.LOGIN);
    dispatch(logout());
  };

  return (
    <Box>
      <Box className="header">
        <Link to={AppRoutes.DASHBOARD}>
          <Box className="header-logo-image">
            <img src={patient} alt="HalloDoc" />
          </Box>
        </Link>

        <Box className="header-user-detail">
          <Typography>Welcome</Typography>
          {/* <Link to={AppRoutes.LOGIN}> */}
          <Button
            name="Log Out"
            variant="outlined"
            size="medium"
            className="log-out-btn"
            onClick={handleLogout}
          />
          {/* </Link> */}
          <Button variant="outlined" size="large" className="dark-btn icon-btn">
            <DarkModeOutlinedIcon />
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="toggle-btn icon-btn"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box className="header-nav-links">
        <li>
          <NavLink
            to={AppRoutes.DASHBOARD}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Provider Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to={AppRoutes.MYPROFILE}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Providers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Partners
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Access
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Records
          </NavLink>
        </li>
      </Box>

      <Drawer open={open} onClose={() => setOpen(false)} className="sidebar">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <Button variant="outlined" size="large" className="dark-btn icon-btn">
            <IconButton size="small">
              <DarkModeOutlinedIcon />
            </IconButton>
          </Button>

          <CloseOutlinedIcon
            onClick={() => setOpen(false)}
            id="close-icon"
            sx={{ position: "initial" }}
          />
        </Box>
        <NavLink to={AppRoutes.DASHBOARD} className="sidelinks">
          Dashboard
        </NavLink>
        <NavLink to="/" className="sidelinks">
          Provider Location
        </NavLink>
        <NavLink to="/" className="sidelinks">
          My Profile
        </NavLink>
        <NavLink to="/" className="sidelinks">
          Providers
        </NavLink>
        <NavLink to="/" className="sidelinks">
          Partners
        </NavLink>
        <NavLink to="/" className="sidelinks">
          Access
        </NavLink>
        <NavLink to="/" className="sidelinks">
          Records
        </NavLink>

        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Logout
        </NavLink>
      </Drawer>
    </Box>
  );
};

export default Header;
