/* eslint-disable camelcase */

import {
  Box,
  Container,
  InputAdornment,
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
import "./userAccess.css";
import { FormInput } from "../../TextField/FormInput";
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button } from "../../Button/ButtonInput";
import { getUserAccess } from "../../../redux/userAccess/userAccessApi";

const UserAccess = () => {
  const [order, setOrder] = useState("asc");
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = useState("account_type");
  const dispatch = useDispatch();

  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const { userAccessData } = useSelector(
    (state) => state.root.userAccessReducer,
  );

  useEffect(() => setTableData(userAccessData), [userAccessData]);
  useEffect(() => {
    dispatch(getUserAccess());
    return undefined;
  }, [dispatch]);

  const handleAdditionalFilterChange = (event) => {
    setAdditionalFilter(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box className="user-main-container">
        <Container maxWidth="lg" className="user-wrapper-container">
          <Typography variant="h5" gutterBottom>
            <b>User Access</b>
          </Typography>
          <Paper className="user-full-paper">
            <Box className="region-box">
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
                {regions?.map((region, index) => {
                  return (
                    <MenuItem key={index} value={region.region_name}>
                      {region.region_name}
                    </MenuItem>
                  );
                })}
              </FormInput>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "account_type"}
                        direction={order}
                        onClick={() => handleRequestSort("account_type")}
                      >
                        Account Type
                      </TableSortLabel>
                    </TableCell>
                    <TableCell className="date-cl">Account POC</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Open Requests</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(tableData, getComparator(order, orderBy)).map(
                    (row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.account_type}</TableCell>
                        <TableCell>{row.account_poc}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.open_requests}</TableCell>
                        <TableCell>
                          <Button name="edit" variant="outlined"></Button>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UserAccess;
