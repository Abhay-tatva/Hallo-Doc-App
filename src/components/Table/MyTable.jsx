/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TablePagination,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./table.css";
import { FormInput } from "../TextField/FormInput";
import { Box } from "@mui/system";
import { Button } from "../Button/ButtonInput";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constant/route";
import { useDispatch, useSelector } from "react-redux";
import { viewCase } from "../../redux/viewCase/viewCaseApi";
import { viewNotes } from "../../redux/viewNotes/viewNotesApi";
import { cancelCase } from "../../redux/cancelCase/cancelCaseApi";
import { transferCase } from "../../redux/transferCase/transferCaseApi";
import { viewUpload } from "../../redux/viewUpload/viewUploadApi";
import { newState } from "../../redux/newState/newStateApi";
import { blockcaseGet } from "../../redux/blockCaseApi.js/blockCaseApi";
import { commonApi } from "../../redux/commonApi/commonApi";
import { getCloseCase } from "../../redux/closeCase/closeCaseApi";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { providerDashBoard } from "../../redux/Provider Site/providerDashBoard/providerDashBoardApi";
import { putAcceptRequest } from "../../redux/Provider Site/acceptRequest/acceptRequestApi";
import { physicianViewNotes } from "../../redux/Provider Site/ViewNotes/physicianViewNotesApi";
import { putHouseCall } from "../../redux/Provider Site/Encounter/encounterApi";
import { physicianCount } from "../../redux/Provider Site/countApi/countApi";
import { getConcludeCare } from "../../redux/Provider Site/concludeCare/concludeCareApi";

const MyTable = ({
  stateButton,
  columns,
  indicator,
  tableDropDown,
  onClick,
  caseCount,
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [copiedStates, setCopiedStates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [confirmno, setConfirmNo] = useState("");
  const [dropDown, setDropDown] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.root.newStateReducer);
  const rows = state?.data?.data;

  useEffect(() => setTableData(rows), [rows]);

  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const { accountType } = useSelector((state) => state.root.loginReducer);

  const copyButtonText = (btnId, event) => {
    const textToCopy = event.target.innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedStates((prev) => ({ ...prev, [btnId]: true }));
        toast.success("Phone number Copyied successfully!");
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [btnId]: false }));
        }, 1000);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) setPageNo(pageNo + 1);
    else setPageNo(pageNo - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterByIndicator = (indicatorValue) => {
    if (indicatorValue === "all") return setTableData(rows);
    else {
      const filteredData = rows.filter((row) => {
        const lowerCaseString = row.requestor.toLowerCase();
        return lowerCaseString.includes(indicatorValue.toLowerCase())
          ? true
          : false;
      });
      setTableData(filteredData);
    }
  };
  useEffect(() => {
    if (accountType === "admin") {
      dispatch(
        newState({
          state: stateButton,
          search: searchTerm,
          region: additionalFilter,
          page_size: rowsPerPage,
          page: pageNo,
        }),
      );
    } else if (accountType === "physician") {
      dispatch(
        providerDashBoard({
          state: stateButton,
          page_size: rowsPerPage,
          page: pageNo,
        }),
      );
    }
  }, [
    accountType,
    stateButton,
    dispatch,
    additionalFilter,
    searchTerm,
    rowsPerPage,
    pageNo,
    caseCount,
  ]);

  useEffect(() => {
    setDropDown(
      tableDropDown?.filter((dropdown) =>
        dropdown.accountTypes?.includes(accountType),
      ),
    );
  }, [accountType, tableDropDown]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, confirmnumber) => {
    setConfirmNo(confirmnumber);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action) => {
    dispatch(commonApi(confirmno));
    setAnchorEl(null);
    switch (action) {
      case "Assign Case":
        onClick(action);
        break;
      case "Cancel Case":
        dispatch(cancelCase(confirmno));
        onClick(action);
        break;
      case "View Case":
        {
          if (accountType == "admin") {
            dispatch(viewCase(confirmno));
            navigate(AppRoutes.RESERVATION);
          } else if (accountType == "physician") {
            // dispatch(physicianViewNotes(confirmno));
          }
        }
        break;
      case "View Notes":
        {
          if (accountType === "admin") {
            dispatch(viewNotes(confirmno));
            navigate(AppRoutes.NOTES);
          } else if (accountType === "physician") {
            dispatch(physicianViewNotes(confirmno));
            navigate(AppRoutes.NOTES);
          }
        }
        break;
      case "Accept":
        dispatch(putAcceptRequest(confirmno)).then((response) => {
          if (response.type === "putAcceptRequest/fulfilled") {
            toast.success(" Request Accept Successfully...");
            dispatch(providerDashBoard({ state: stateButton }));
          }
        });
        break;
      case "Block Patient":
        dispatch(blockcaseGet(confirmno));
        onClick(action);
        break;
      case "Type of Care":
        onClick(action);
        break;
      case "Encounter Modal":
        onClick(action);
        break;
      case "Encounter Form":
        navigate(AppRoutes.ENCOUNTERFORM);
        break;
      case "View Upload":
        dispatch(viewUpload(confirmno));
        navigate(AppRoutes.VIEWUPLOAD);
        break;
      case "Conclude Care":
        dispatch(getConcludeCare(confirmno));
        navigate(AppRoutes.CONCLUDECARE);
        break;
      case "Orders":
        navigate(AppRoutes.ORDER);
        break;
      case "Transfer":
        dispatch(transferCase);
        onClick(action);
        break;
      case "Clear Case":
        onClick(action);
        break;
      case "Send Agreement":
        onClick(action);
        break;
      case "Close Case":
        dispatch(getCloseCase(confirmno));
        navigate(AppRoutes.CLOSECASE);
        break;
      case "Request To Admin":
        onClick(action);
        break;

      default:
        break;
    }
  };

  return (
    <div className="my-table-container">
      <Grid
        container={true}
        alignItems="center"
        justifyContent="space-between"
        className="table-head"
        spacing={{ xs: 2 }}
      >
        <Grid item xs={12} md={12} lg={6}>
          <Box className="search-dropdown">
            <div className="search-bar">
              <FormInput
                className="search-text"
                placeholder="Search By Name"
                variant="outlined"
                value={searchTerm}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <FormInput
              className="search-text drop-list"
              select
              placeholder="All Regions"
              value={additionalFilter}
              onChange={(e) => setAdditionalFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {regions?.map((region, index) => {
                return (
                  <MenuItem key={index} value={region.region_name}>
                    {region.region_name}
                  </MenuItem>
                );
              })}
            </FormInput>
          </Box>
        </Grid>
        <Grid container justifyContent={"flex-end"} item xs={12} md={12} lg={6}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Button
              name="All"
              variant="outlined"
              onClick={() => filterByIndicator("all")}
            />

            {indicator.map((value, index) => {
              return (
                <Box
                  className="cursor"
                  key={index}
                  display="flex"
                  alignItems="center"
                  onClick={() => filterByIndicator(value.name)}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: value.color,
                      display: "inline-block",
                      marginLeft: "30px",
                    }}
                  ></span>
                  <Typography ml={1}>{value.name}</Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  if (column.accountTypes.includes(accountType)) {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className="table-head-label"
                      >
                        {column.label}
                      </TableCell>
                    );
                  }
                  return null;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((row) => {
                return (
                  <TableRow
                    key={row.confirmationNo}
                    className={`requestor-${row.requestor?.toLowerCase()}`}
                  >
                    <TableCell>{row.patient_data.name}</TableCell>
                    <TableCell>
                      <EmailOutlinedIcon />
                    </TableCell>

                    {accountType == "admin" && stateButton !== "unpaid" && (
                      <TableCell>{row.patient_data.DOB}</TableCell>
                    )}
                    {accountType == "admin" && stateButton === "toclose" && (
                      <TableCell>{row.patient_data.region}</TableCell>
                    )}
                    {accountType == "admin" &&
                      (stateButton === "new" ||
                        stateButton === "pending" ||
                        stateButton === "active") && (
                        <TableCell>
                          {row.requestor},{row?.requestor_data?.firstname}
                          {row?.requestor_data?.last_name}
                        </TableCell>
                      )}
                    {accountType == "admin" &&
                      (stateButton === "pending" ||
                        stateButton === "active" ||
                        stateButton === "conclude" ||
                        stateButton === "toclose" ||
                        stateButton === "unpaid") && (
                        <TableCell>{row?.physician_data?.name}</TableCell>
                      )}
                    {accountType == "admin" &&
                      (stateButton === "pending" ||
                        stateButton === "active" ||
                        stateButton === "conclude" ||
                        stateButton === "toclose" ||
                        stateButton === "unpaid") && (
                        <TableCell>{row?.date_of_service}</TableCell>
                      )}
                    {accountType == "admin" && stateButton === "new" && (
                      <TableCell>{row.requested_date}</TableCell>
                    )}
                    {stateButton !== "toclose" && (
                      <TableCell>
                        <Button
                          className="phone-btn"
                          name={row.patient_data.mobile_no}
                          startIcon={<LocalPhoneOutlinedIcon />}
                          variant="outlined"
                          color="inherit"
                          onClick={(e) => {
                            copyButtonText(row.confirmationNo, e);
                          }}
                        />
                        {copiedStates[row.request_id]}
                      </TableCell>
                    )}
                    <TableCell>{row.patient_data.address}</TableCell>
                    {accountType == "physician" && stateButton == "active" && (
                      <TableCell>
                        {row.request_status === "md_on_site" ? (
                          <Button
                            className="phone-btn"
                            name={
                              row.request_status === "md_on_site" && "houseCall"
                            }
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              dispatch(putHouseCall(row.confirmation_no)).then(
                                (response) => {
                                  if (response === "putHouseCall/fulfilled") {
                                    toast.success(
                                      "House On call add Successful...",
                                    );
                                    dispatch(physicianCount());
                                  }
                                },
                              );
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    )}
                    {accountType == "admin" &&
                      (stateButton === "new" ||
                        stateButton === "pending" ||
                        stateButton === "active" ||
                        stateButton === "toclose") && (
                        <TableCell>{row.notes?.[0]?.description}</TableCell>
                      )}

                    <TableCell>
                      <Button
                        className="phone-btn"
                        name="Action"
                        variant="outlined"
                        color="inherit"
                        onClick={(e) => {
                          handleClick(e, row.confirmation_no);
                        }}
                      />

                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open && row.confirmation_no === confirmno}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        {dropDown.map((data) => {
                          return (
                            <MenuItem
                              key={data.id}
                              onClick={() => {
                                data.name === "Encounter"
                                  ? row?.is_finalized === "true"
                                    ? handleClose("Encounter Modal")
                                    : row.request_status === "md_on_site" &&
                                        "houseCall"
                                      ? handleClose("Encounter Form")
                                      : handleClose("Type of Care")
                                  : handleClose(data.name);
                              }}
                              disableRipple
                            >
                              {data.icon}&nbsp;{data.name}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.data?.total_count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default MyTable;
