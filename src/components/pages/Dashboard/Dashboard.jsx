import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import "./dashboard.css";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "../../Button/ButtonInput";
import { Grid, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import IosShareIcon from "@mui/icons-material/IosShare";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import MyTable from "../../Table/MyTable";
import {
  errorTriangle,
  infoTriangle,
  primaryTriangle,
  secondaryTriangle,
  successTriangle,
  warningTriangle,
} from "../../assests/images";
import {
  newColumns,
  indicator,
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
} from "../../../constant/common";
import CancelModal from "../../Modal/CancelModal";
import AssignModal from "../../Modal/AssignModal";
import ConfirmBlockModal from "../../Modal/ConfirmBlockModal";
import TransferModal from "../../Modal/TransferModal";
import ClearCaseModal from "../../Modal/ClearCaseModal";
import SendAgreementModal from "../../Modal/SendAgreementModal";
import RequestModal from "../../Modal/RequestModal";
import SendLinkModal from "../../Modal/SendLinkModal";
import { useDispatch, useSelector } from "react-redux";
import { getRegions } from "../../../redux/regionPhysician/regionPhysicianApi";
import { requestCount } from "../../../redux/requestCount/requestCountApi";
import { sendOrderProfession } from "../../../redux/professionBussiness/getProfessionBussinessApi";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";
import { exportAll, singleExport } from "../../../redux/export/exportApi";
// import { providerDashBoard } from "../../../redux/Provider Site/providerDashBoard/providerDashBoardApi";
import { physicianCount } from "../../../redux/Provider Site/countApi/countApi";
import TypeOfCareModal from "../../Modal/TypeOfCareModal";
import EncounterModal from "../../Modal/EncounterModal";

const cards = [
  {
    applicationState: "new",
    figure: "1452",
    icon: <NewReleasesIcon />,
    color: "primary",
    toolTip: primaryTriangle,
    accountTypes: ["admin", "physician"],
  },
  {
    applicationState: "pending",
    figure: "266",
    icon: <PendingIcon />,
    color: "secondary",
    toolTip: secondaryTriangle,
    accountTypes: ["admin", "physician"],
  },
  {
    applicationState: "active",
    figure: "26",
    icon: <CheckCircleOutlineIcon />,
    color: "success",
    toolTip: successTriangle,
    accountTypes: ["admin", "physician"],
  },
  {
    applicationState: "conclude",
    figure: "1078",
    icon: <CodeIcon />,
    color: "error",
    toolTip: errorTriangle,
    accountTypes: ["admin", "physician"],
  },
  {
    applicationState: "toclose",
    figure: "519",
    icon: <CancelOutlinedIcon />,
    color: "info",
    toolTip: infoTriangle,
    accountTypes: ["admin"],
  },
  {
    applicationState: "unpaid",
    figure: "16",
    icon: <AttachMoneyIcon />,
    color: "warning",
    toolTip: warningTriangle,
    accountTypes: ["admin"],
  },
];

const Dashboard = () => {
  const [isActive, setIsActive] = useState(true);
  const [filterRows, setFilterRows] = useState();
  const [rowId, setRowId] = useState(null);
  const [activeButton, setActiveButton] = useState("new");
  const [columns, setColumns] = useState(newColumns);
  const [dropDown, setDropDown] = useState(newDropdown);
  const [open, setOpen] = React.useState(false);
  const [modalName, setModalName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.root.requestCountReducer);
  const { accountType } = useSelector((state) => state.root.loginReducer);
  const caseCount = count.caseCount;

  const handleOpen = (name, rowId) => {
    setRowId(rowId);
    setModalName(name);
    setOpen(true);
  };
  useEffect(() => {
    if (accountType === "admin") {
      dispatch(getRegions());
      dispatch(requestCount());
      dispatch(sendOrderProfession());
    } else if (accountType === "physician") {
      // dispatch(providerDashBoard({ state: activeButton }));
      dispatch(physicianCount());
    }
  }, [accountType, dispatch, activeButton]);

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
                {card.accountTypes.includes(accountType) ? (
                  <>
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
                      {caseCount?.map((count, index) => {
                        return (
                          <Typography variant="h5" key={index}>
                            {accountType === "admin"
                              ? count.request_state ===
                                  card.applicationState && <b>{count.counts}</b>
                              : accountType === "physician"
                                ? count.request_state ===
                                    card.applicationState && (
                                    <b>{count.counts}</b>
                                  )
                                : null}
                          </Typography>
                        );
                      })}
                    </Button>
                    {isActive && activeButton === card.applicationState ? (
                      <img
                        src={card.toolTip}
                        alt="triangle"
                        className="btn-triangle"
                      />
                    ) : null}
                  </>
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
                Patients<span className="state"> ({activeButton}) </span>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box className="btn-2">
                <Button
                  accountType={accountType}
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
                  onClick={() => navigate(AppRoutes.CREATEREQUEST)}
                />
                {accountType === "admin" ? (
                  <>
                    <Button
                      name="Export"
                      variant="contained"
                      startIcon={<ExitToAppIcon />}
                      className="btn"
                      onClick={() =>
                        dispatch(singleExport(activeButton.toLowerCase()))
                          .then((response) => {
                            if (response.type === "singleExport/fulfilled") {
                              const blob = new Blob([response.payload], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              });
                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.download = `${activeButton}State-patients.xlsx`;
                              document.body.appendChild;
                              link.click();
                              window.URL.revokeObjectURL(url);
                              link.remove();
                            } else {
                              console.error("File download failed.");
                            }
                          })
                          .catch((error) => {
                            console.error("Error downloading file:", error);
                          })
                      }
                    />

                    <Button
                      name="Export All"
                      variant="contained"
                      startIcon={<IosShareIcon />}
                      className="btn"
                      onClick={() =>
                        dispatch(exportAll())
                          .then((response) => {
                            if (response.type === "exportAll/fulfilled") {
                              const blob = new Blob([response.payload], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              });
                              const url = window.URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = url;
                              link.download = `All-patients.xlsx`;
                              document.body.appendChild;
                              link.click();
                              window.URL.revokeObjectURL(url);
                              link.remove();
                            } else {
                              console.error("File download failed.");
                            }
                          })
                          .catch((error) => {
                            console.error("Error downloading file:", error);
                          })
                      }
                    />

                    <Button
                      name="Request DTY Support"
                      variant="contained"
                      startIcon={<PersonIcon />}
                      className="btn"
                      onClick={() => handleOpen("Request Modal")}
                    />
                  </>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <MyTable
          caseCount={caseCount}
          stateButton={activeButton?.toLowerCase()}
          columns={columns}
          indicator={indicator}
          tableDropDown={dropDown}
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
      <TypeOfCareModal
        open={open && modalName === "Type of Care"}
        handleClose={handleClose}
        handleOpen={modalName === "Type of Care" ? handleOpen : null}
      />
      <EncounterModal
        open={open && modalName === "Encounter Modal"}
        handleClose={handleClose}
        handleOpen={modalName === "Encounter Modal" ? handleOpen : null}
      />
    </>
  );
};

export default Dashboard;
