import {
  Box,
  Container,
  Fade,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./patientRecords.css";
import { Button } from "../../Button/ButtonInput";
import { columns, rows } from "../../../constant/patientRecordsData";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";

const PatientRecords = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [rowId, setRowId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => setTableData(rows), [rows]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <form>
        <Box className="records-main-container">
          <Container maxWidth="xl" className="records-wrapper-conatiner">
            <Box display="flex" justifyContent="space-between " mb={2}>
              <Typography variant="h5" gutterBottom>
                <b>Patient Records</b>
              </Typography>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                onClick={() => navigate(-1)}
              />
            </Box>
            <Paper className="records-full-paper">
              <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
                <Table>
                  <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align="left"
                          style={{ minWidth: column.minWidth }}
                          className="table-head-label"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody align="left">
                    {tableData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      ?.map((row) => {
                        return (
                          <TableRow key={row.id}>
                            {columns.map((column) => {
                              return (
                                <TableCell key={column.id} align="left">
                                  {column.id === "actions" ? (
                                    <>
                                      <Button
                                        name="Action"
                                        variant="outlined"
                                        onClick={(e) => handleClick(e, row.id)}
                                      />
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
                                        <MenuItem
                                          disableRipple
                                          onClick={handleClose}
                                        >
                                          View Case
                                        </MenuItem>
                                        <MenuItem
                                          disableRipple
                                          onClick={handleClose}
                                        >
                                          Chat
                                        </MenuItem>
                                        <MenuItem
                                          disableRipple
                                          onClick={handleClose}
                                        >
                                          0 Documents
                                        </MenuItem>
                                      </Menu>
                                    </>
                                  ) : column.id === "finalReport" ? (
                                    row.status === "Closed" ? (
                                      <Button name="view" variant="outlined" />
                                    ) : (
                                      " - "
                                    )
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
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Container>
        </Box>
      </form>
    </>
  );
};

export default PatientRecords;
