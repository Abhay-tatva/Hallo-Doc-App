import {
  Box,
  Checkbox,
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
import { useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button } from "../../Button/ButtonInput";

const rows = [
  {
    id: 1,
    acoountType: "Ain",
    acoountPoc: "Test, Admin",
    phone: "91082006 99203",
    status: "Active",
    openRequests: "2133",
    action: "Actions",
  },
  {
    id: 2,
    acoountType: "Admin",
    acoountPoc: "Test, Admin",
    phone: "91082006 99203",
    status: "Active",
    openRequests: "2133",
    action: "Actions",
  },
  {
    id: 3,
    acoountType: "Admin",
    acoountPoc: "Test, Admin",
    phone: "91082006 99203",
    status: "Active",
    openRequests: "2133",
    action: "Actions",
  },
];

const UserAccess = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = useState("accountType");
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  useEffect(() => setTableData(rows), [rows]);
  const handleAdditionalFilterChange = (event) => {
    setAdditionalFilter(event.target.value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < rows.length
                        }
                        checked={selected.length === rows.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "accountType"}
                        direction={order}
                        onClick={() => handleRequestSort("accountType")}
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
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row) => (
                      <TableRow key={row.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row.id)}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell>{row.acoountType}</TableCell>
                        <TableCell>{row.acoountPoc}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.openRequests}</TableCell>
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
