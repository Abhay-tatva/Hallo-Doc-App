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
  TableSortLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { FormInput } from "../../TextField/FormInput";
import { columns, rows } from "../../../constant/searchRecordsData";
import "./searchRecords.css";

const SearchRecords = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");

  useEffect(() => setTableData(rows), [rows]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      <form>
        <Box className="searchrecord-main-container">
          <Container maxWidth="80%" className="searchrecord-wrapper-container">
            <Box display="flex" justifyContent="space-between " mb={2}>
              <Typography variant="h5" gutterBottom>
                <b>Search Records</b>
              </Typography>
              <Button
                name="Export Data To Excel"
                variant="contained"
                startIcon={<ExitToAppOutlinedIcon />}
              />
            </Box>
            <Paper className="searchrecord-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Select Request Status"
                    name="requestStatus"
                    fullWidth
                    select
                  >
                    <MenuItem>fullfill</MenuItem>
                    <MenuItem>reject</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Patient Name"
                    name="patientName"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="select Request Type"
                    name="requetType"
                    fullWidth
                    select
                  >
                    <MenuItem>completed</MenuItem>
                    <MenuItem>pending</MenuItem>
                    <MenuItem>hold</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    // label="Form data of service"
                    name="serviceDate"
                    fullWidth
                    type="date"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    // label="To Date of Service"
                    name="toServiceDate"
                    fullWidth
                    type="date"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Provider Name"
                    name="providerName"
                    fullWidth
                  />
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
                mt={2}
                gap={2}
                mb={2}
              >
                <Button variant="outlined">Clear</Button>
                <Button variant="contained">Search</Button>
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
                          <TableSortLabel
                            active={orderBy === column.id}
                            direction={order}
                            onClick={() => handleRequestSort(column.id)}
                          ></TableSortLabel>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody align="left">
                    {stableSort(tableData, getComparator(order, orderBy))
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

export default SearchRecords;
