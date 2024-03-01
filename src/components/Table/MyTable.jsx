import React, { useState } from "react";
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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constant/route";

const MyTable = ({ rows, columns, indicator, dropDown, onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("name");
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [copiedStates, setCopiedStates] = useState({});
  const [tableData, setTableData] = useState(rows);
  const [rowId, setRowId] = useState(null);
  const navigate = useNavigate();

  const notify = () => toast("Phone number Copyied successfully!");

  const copyButtonText = (btnId, event) => {
    const textToCopy = event.target.innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedStates((prev) => ({ ...prev, [btnId]: true }));
        notify();
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [btnId]: false }));
        }, 1000);
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterRows = (rows, term) => {
    setSearchTerm(term);
    const filterData = rows.filter((row) =>
      Object.entries(row).some(([key, value]) => {
        if (!value) {
          return false;
        }
        const lowerCaseValue =
          typeof value === "string"
            ? value.toLowerCase()
            : String(value).toLowerCase();

        if (key === "name") {
          const nameText = value.props.children[0].props.children;
          return nameText.toLowerCase().includes(term.toLowerCase());
        }

        return (
          selectedColumn === "all" ||
          (key === selectedColumn &&
            lowerCaseValue.includes(term.toLowerCase())) ||
          (selectedColumn === "dateOfBirth" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase())) ||
          (selectedColumn === "requestor" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase())) ||
          (selectedColumn === "requestedDate" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase())) ||
          (selectedColumn === "phoneNumber" &&
            row[selectedColumn].toString().includes(term)) ||
          (selectedColumn === "address" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase())) ||
          (selectedColumn === "notes" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase())) ||
          (selectedColumn === "chatWith" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase())) ||
          (selectedColumn === "action" &&
            row[selectedColumn].toLowerCase().includes(term.toLowerCase()))
        );
      })
    );
    setTableData(filterData);
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

  const handleAdditionalFilterChange = (event) => {
    setAdditionalFilter(event.target.value);
    setSelectedColumn(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    switch (action) {
      case "Assign Case":
        onClick(action);
        break;
      case "Cancel Case":
        onClick(action);
        break;
      case "View Case":
        navigate(AppRoutes.RESERVATION);
        break;
      case "View Notes":
        navigate(AppRoutes.NOTES);
        break;
      case "Block Patient":
        onClick(action);
        break;
      case "View Upload":
        navigate(AppRoutes.VIEWUPLOAD);
        break;
      case "Orders":
        navigate(AppRoutes.ORDER);
        break;
      case "Transfer":
        onClick(action);
        break;
      case "Clear Case":
        onClick(action, rowId);
        break;
      case "Send Agreement":
        onClick(action);
        break;
      case "Close Case":
        navigate(AppRoutes.CLOSECASE);
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
                placeholder="Search"
                variant="outlined"
                value={searchTerm}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => filterRows(rows, e.target.value)}
              />
            </div>
            <FormInput
              className="search-text drop-list"
              select
              placeholder="All Regions"
              value={additionalFilter}
              onChange={handleAdditionalFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {columns.map((column) => {
                return (
                  <MenuItem key={column.id} value={column.id}>
                    {column.label}
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
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="table-head-label"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      className={`requestor-${row.requestor.toLowerCase()}`}
                    >
                      {columns?.map((column) => {
                        return (
                          <TableCell key={column.id}>
                            {["phoneNumber", "chatWith", "action"].includes(
                              column.id
                            ) ? (
                              <>
                                <Button
                                  className="phone-btn"
                                  name={row[column.id]}
                                  startIcon={
                                    (column.id === "phoneNumber" && (
                                      <LocalPhoneOutlinedIcon />
                                    )) ||
                                    (column.id === "chatWith" && (
                                      <PersonOutlineOutlinedIcon />
                                    ))
                                  }
                                  variant="outlined"
                                  color="inherit"
                                  onClick={(e) => {
                                    column.id === "phoneNumber" &&
                                      copyButtonText(row.id, e);
                                    column.id === "action" &&
                                      handleClick(e, row.id);
                                  }}
                                />
                                {column.id === "phoneNumber" &&
                                  copiedStates[row.id]}
                                {column.id === "action" && (
                                  <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                      "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open && row.id === rowId}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                  >
                                    {dropDown.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data.id}
                                          onClick={() => {
                                            handleClose(data.name);
                                          }}
                                          disableRipple
                                        >
                                          {data.icon}&nbsp;{data.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Menu>
                                )}
                              </>
                            ) : (
                              row[column.id]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData.length}
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
