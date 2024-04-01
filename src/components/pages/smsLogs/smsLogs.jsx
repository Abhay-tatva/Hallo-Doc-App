import {
  Box,
  Container,
  Grid,
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
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Button } from "../../Button/ButtonInput";
import { FormInput } from "../../TextField/FormInput";
import "./smsLogs.css";
import { columns, rows } from "../../../constant/smsLogs";

const SmsLogs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  useEffect(() => setTableData(rows), [rows]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <form>
        <Box className="email-main-conatiner">
          <Container maxWidth="90%" className="email-wrapper-container">
            <Box display="flex" justifyContent="space-between " mb={2}>
              <Typography variant="h5" gutterBottom>
                <b>Sms Logs(Twilio)</b>
              </Typography>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
              />
            </Box>
            <Paper className="email-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }} mb={2}>
                <Grid item xs={12} md={2}>
                  <FormInput
                    label="Search By Role"
                    name="searchByRole"
                    fullWidth
                    select
                  >
                    <MenuItem id="all">All</MenuItem>
                    <MenuItem id="patient">Patient</MenuItem>
                    <MenuItem id="doctor">Doctor</MenuItem>
                    <MenuItem id="physician">Physician</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    label="Receiver Name"
                    name="receiverName"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput label="Email Id" name="emaiId" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    // label="Created Date"
                    name="createDate"
                    fullWidth
                    type="date"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    // label="Send date"
                    name="sendate"
                    fullWidth
                    type="date"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="contained">Search</Button>
                    <Button variant="outlined">Clear</Button>
                  </Box>
                </Grid>
              </Grid>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      ?.map((row) => {
                        return (
                          <TableRow key={row.id}>
                            {columns.map((column) => {
                              return (
                                <TableCell key={column.id} align="left">
                                  {column.id === "delete" ? (
                                    // <Box
                                    //   display="flex"
                                    //   gap={1}
                                    //   alignItems="left"
                                    // >
                                    <Button
                                      name="delete"
                                      variant="outlined"
                                      size="small"
                                    />
                                  ) : (
                                    // </Box>
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

export default SmsLogs;
