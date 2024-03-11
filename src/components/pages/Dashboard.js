import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import "../dashboard.css";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "../Button/ButtonInput";
import { Grid, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import IosShareIcon from "@mui/icons-material/IosShare";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import MyTable from "../Table/MyTable";
import {
  errorTriangle,
  infoTriangle,
  primaryTriangle,
  secondaryTriangle,
  successTriangle,
  warningTriangle,
} from "../assests/images";
import {
  newColumns,
  indicator,
  rows,
  newDropdown,
  pendingColumns,
  pendingDropdown,
  activeColumns,
  activeDropdown,
  concludeColumns,
  concludeDropdown,
  toCloseColumns,
  toCloseDropdown,
  unpaidColumns,
  unpaidDropdown,
} from "../../constant/common";
import CancelModal from "../Modal/CancelModal";
import AssignModal from "../Modal/AssignModal";
import ConfirmBlockModal from "../Modal/ConfirmBlockModal";
import TransferModal from "../Modal/TransferModal";
import ClearCaseModal from "../Modal/ClearCaseModal";
import SendAgreementModal from "../Modal/SendAgreementModal";
import RequestModal from "../Modal/RequestModal";
import SendLinkModal from "../Modal/SendLinkModal";
import { useDispatch } from "react-redux";
import { newState } from "../../redux/newState/newStateApi";

const cards = [
  {
    applicationState: "new",
    figure: "1452",
    icon: <NewReleasesIcon />,
    color: "primary",
    toolTip: primaryTriangle,
  },
  {
    applicationState: "pending",
    figure: "266",
    icon: <PendingIcon />,
    color: "secondary",
    toolTip: secondaryTriangle,
  },
  {
    applicationState: "active",
    figure: "26",
    icon: <CheckCircleOutlineIcon />,
    color: "success",
    toolTip: successTriangle,
  },
  {
    applicationState: "conclude",
    figure: "1078",
    icon: <CodeIcon />,
    color: "error",
    toolTip: errorTriangle,
  },
  {
    applicationState: "toclose",
    figure: "519",
    icon: <CancelOutlinedIcon />,
    color: "info",
    toolTip: infoTriangle,
  },
  {
    applicationState: "unpaid",
    figure: "16",
    icon: <AttachMoneyIcon />,
    color: "warning",
    toolTip: warningTriangle,
  },
];

const Dashboard = () => {
  const [isActive, setIsActive] = useState(true);
  const [filterRows, setFilterRows] = useState(rows);
  const [rowId, setRowId] = useState(null);
  const [activeButton, setActiveButton] = useState("new");
  const [columns, setColumns] = useState(newColumns);
  const [dropDown, setDropDown] = useState(newDropdown);
  const [open, setOpen] = React.useState(false);
  const [modalName, setModalName] = useState("");
  const dispatch = useDispatch();

  const handleOpen = (name, rowId) => {
    setRowId(rowId);
    setModalName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalName("");
  };

  const handleClear = (id) => {
    setFilterRows((prevRows) => prevRows.filter((row) => id !== row.id));
    console.log("row", filterRows);
    handleClose();
  };

  const handleClick = (name) => {
    setActiveButton(name);
    setIsActive(true);
  };

  useEffect(() => {
    dispatch(newState(activeButton?.toLowerCase())).then((response) => {
      console.log("New Response", response);
    });
  }, [activeButton, dispatch]);

  useEffect(() => {
    switch (activeButton) {
      case "new":
        setColumns(newColumns);
        setDropDown(newDropdown);
        break;
      case "pending":
        setColumns(pendingColumns);
        setDropDown(pendingDropdown);
        break;
      case "active":
        setColumns(activeColumns);
        setDropDown(activeDropdown);
        break;
      case "conclude":
        setColumns(concludeColumns);
        setDropDown(concludeDropdown);
        break;
      case "toclose":
        setColumns(toCloseColumns);
        setDropDown(toCloseDropdown);
        break;
      case "unpaid":
        setColumns(unpaidColumns);
        setDropDown(unpaidDropdown);
        break;
      default:
        setColumns(newColumns);
        setDropDown(newDropdown);
    }
  }, [activeButton]);

  return (
    <>
      <Box container className="dashboard-container">
        <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}>
          {cards.map((card, index) => {
            return (
              <Grid
                key={index}
                container
                justifyContent="center"
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Button
                  color={card.color}
                  variant={
                    isActive && activeButton === card.applicationState
                      ? "contained"
                      : "outlined"
                  }
                  className="card-btn"
                  fullWidth
                  onClick={() => handleClick(card.applicationState)}
                >
                  <Box className="card-content-heading">
                    {card.icon}
                    <Typography variant="body1">
                      {card.applicationState}
                    </Typography>
                  </Box>
                  <Typography variant="h5">{card.figure}</Typography>
                </Button>
                {isActive && activeButton === card.applicationState ? (
                  <img
                    src={card.toolTip}
                    alt="triangle"
                    className="btn-triangle"
                  />
                ) : null}
              </Grid>
            );
          })}
        </Grid>
        <Box className="state-grid">
          <Grid
            container
            justifySelf="space-between"
            alignItems="baseline"
            spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }}
          >
            <Grid item xs={12} lg={5}>
              <Typography variant="h5">
                Patients<span className="state"> (New) </span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box className="btn-2">
                <Button
                  name="Send Link"
                  variant="contained"
                  startIcon={<SendOutlinedIcon />}
                  className="btn"
                  onClick={() => handleOpen("Send Link")}
                />

                <Button
                  name="Create Request"
                  variant="contained"
                  startIcon={<RequestPageOutlinedIcon />}
                  className="btn"
                />

                <Button
                  name="Export"
                  variant="contained"
                  startIcon={<ExitToAppIcon />}
                  className="btn"
                />

                <Button
                  name="Export All"
                  variant="contained"
                  startIcon={<IosShareIcon />}
                  className="btn"
                />

                <Button
                  name="Request DTY Support"
                  variant="contained"
                  startIcon={<PersonIcon />}
                  className="btn"
                  onClick={() => handleOpen("Request Modal")}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <MyTable
          stateButton={activeButton?.toLowerCase()}
          columns={columns}
          indicator={indicator}
          dropDown={dropDown}
          onClick={handleOpen}
        />
      </Box>
      <CancelModal
        open={open && modalName === "Cancel Case"}
        handleClose={handleClose}
        handleOpen={modalName === "Cancel Case" ? handleOpen : null}
      />
      <AssignModal
        open={open && modalName === "Assign Case"}
        handleClose={handleClose}
        handleOpen={modalName === "Assign Case" ? handleOpen : null}
      />
      <ConfirmBlockModal
        open={open && modalName === "Block Patient"}
        handleClose={handleClose}
        handleOpen={modalName === "Block Patient" ? handleOpen : null}
      />
      <RequestModal
        open={open && modalName === "Request Modal"}
        handleClose={handleClose}
        handleOpen={modalName === "Request Modal" ? handleOpen : null}
      />
      <TransferModal
        open={open && modalName === "Transfer"}
        handleClose={handleClose}
        handleOpen={modalName === "Transfer" ? handleOpen : null}
      />
      <ClearCaseModal
        open={open && modalName === "Clear Case"}
        handleClose={handleClose}
        handleClear={handleClear}
        rowId={rowId}
        handleOpen={
          modalName === "Clear Case"
            ? () => handleOpen("Clear Case", rowId)
            : null
        }
      />
      <SendAgreementModal
        open={open && modalName === "Send Agreement"}
        handleClose={handleClose}
        handleOpen={modalName === "Send Agreement" ? handleOpen : null}
      />
      <SendLinkModal
        open={open && modalName === "Send Link"}
        handleClose={handleClose}
        handleOpen={modalName === "Send Link" ? handleOpen : null}
      />
    </>
  );
};

export default Dashboard;
