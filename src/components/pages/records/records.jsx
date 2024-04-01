import {
  Box,
  Container,
  Grid,
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
import "./records.css";
import { FormInput } from "../../TextField/FormInput";
import { Button } from "../../Button/ButtonInput";
import { columns, rows } from "../../../constant/recordsData";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";

const Records = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
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
        <Box className="records-main-container">
          <Container maxWidth="xl" className="records-wrapper-conatiner">
            <Typography variant="h5" gutterBottom>
              <b>Patient History</b>
            </Typography>
            <Paper className="records-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <FormInput label="First Name" name="firstName" fullWidth />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput label="Last Name" name="lastName" fullWidth />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput label="Email" name="email" fullWidth />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Phone Number"
                    name="phoneNumber"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                pt={2}
                pb={2}
              >
                <Button name="Clear" variant="outlined" />
                <Button name="Search" />
              </Box>
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
                                    // <Box
                                    //   display="flex"
                                    //   gap={1}
                                    //   alignItems="left"
                                    // >
                                    <Button
                                      name="Explore"
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        navigate(AppRoutes.PATIENTRECORDS)
                                      }
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

export default Records;
