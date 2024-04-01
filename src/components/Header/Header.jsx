import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import React, { useState } from "react";
import { patient } from "../assests/images";
import { Button } from "../Button/ButtonInput";
import "./header.css";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constant/route";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/loginSlice";
import { getMyProfile } from "../../redux/myProfile/myProfileApi";

const Header = ({ isDarktheme, handleDarkMode }) => {
  const [open, setOpen] = useState(false);
  const [providerMenuOpen, setProviderMenuOpen] = useState(false);
  const [recordsMenuOpen, setRecordsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(AppRoutes.LOGIN);
    dispatch(logout());
  };
  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setProviderMenuOpen(false);
    setRecordsMenuOpen(false);
  };

  const handleNavLinkHover = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    if (menuType === "provider") {
      setProviderMenuOpen(true);
      setRecordsMenuOpen(false);
    } else if (menuType === "records") {
      setProviderMenuOpen(false);
      setRecordsMenuOpen(true);
    }
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
          <Button
            name="Log Out"
            variant="outlined"
            size="medium"
            className="log-out-btn"
            onClick={handleLogout}
          />
          <Button
            variant="outlined"
            size="large"
            className="dark-btn icon-btn"
            onClick={handleDarkMode}
          >
            {!isDarktheme ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="toggle-btn icon-btn"
            onClick={() => setOpen(true)}
          >
            <MenuOutlinedIcon />
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
            to={AppRoutes.PROVIDERLOCATION}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Provider Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to={AppRoutes.MYPROFILE}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => dispatch(getMyProfile())}
          >
            My Profile
          </NavLink>
        </li>
        <li
          onMouseEnter={(e) => handleNavLinkHover(e, "provider")}
          onMouseLeave={handleMenuClose}
        >
          <NavLink
            to={AppRoutes.PROVIDER}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Providers
          </NavLink>
          {providerMenuOpen && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.PROVIDER);
                  handleMenuClose();
                }}
              >
                Provider
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.SCHEDULING);
                  handleMenuClose();
                }}
              >
                Scheduling
              </MenuItem>
              <MenuItem onClick={() => navigate(-1)}>Invoicing</MenuItem>
            </Menu>
          )}
        </li>
        <li>
          <NavLink
            to={AppRoutes.PARTNERS}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Partners
          </NavLink>
        </li>
        <li>
          <NavLink
            to={AppRoutes.ACCESSACCOUNT}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Access
          </NavLink>
        </li>
        <li
          onMouseEnter={(e) => handleNavLinkHover(e, "records")}
          onMouseLeave={handleMenuClose}
        >
          <NavLink
            to={AppRoutes.RECORDS}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Records
          </NavLink>
          {recordsMenuOpen && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.SEARCHRECORDS);
                  handleMenuClose();
                }}
              >
                Search Records
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.EMAILLOGS);
                  handleMenuClose();
                }}
              >
                Email Logs
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.SMSLOGS)}>
                SMS Logs
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(AppRoutes.PATIENTHISTORY);
                  handleMenuClose();
                }}
              >
                Patients Records
              </MenuItem>
              <MenuItem onClick={() => navigate(AppRoutes.BLOCKHISTORY)}>
                Blocked History
              </MenuItem>
            </Menu>
          )}
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
        <NavLink to={AppRoutes.PROVIDERLOCATION} className="sidelinks">
          Provider Location
        </NavLink>
        <NavLink to={AppRoutes.MYPROFILE} className="sidelinks">
          My Profile
        </NavLink>
        <NavLink to={AppRoutes.PROVIDER} className="sidelinks">
          Providers
        </NavLink>
        <NavLink to="/" className="sidelinks">
          Partners
        </NavLink>
        <NavLink to={AppRoutes.ACCESSACCOUNT} className="sidelinks">
          Access
        </NavLink>
        <NavLink to={AppRoutes.RECORDS} className="sidelinks">
          Records
        </NavLink>

        <NavLink to={AppRoutes.LOGIN} className="sidelinks">
          Logout
        </NavLink>
      </Drawer>
      <Outlet />
    </Box>
  );
};

export default Header;
