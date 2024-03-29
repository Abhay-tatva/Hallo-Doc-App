import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { FormInput } from "../../TextField/FormInput";
import { Button } from "../../Button/ButtonInput";
import "./partners.css";
import { columns, rows } from "../../../constant/partnersData";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Partners = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const navigate = useNavigate();
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
        <Box className="partners-main-container ">
          <Container maxWidth="xl" className="partners-wrapper-container">
            <Typography variant="h5" gutterBottom>
              <b>Vendor(s)</b>
            </Typography>
            <Paper className="partners-full-paper ">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                className="partners-header"
              >
                <Box display="flex" alignItems="center" gap={2}>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
                <Button
                  name="Add Business"
                  variant="outlined"
                  onClick={() => navigate(AppRoutes.ADDBUSSINESS)}
                >
                  <AddOutlinedIcon />
                </Button>
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
                                    <Box
                                      display="flex"
                                      gap={1}
                                      alignItems="center"
                                    >
                                      <Button
                                        name="Edit"
                                        variant="outlined"
                                        size="small"
                                        // onClick={handleOpen}
                                      />
                                      <Button
                                        name="Delete"
                                        variant="outlined"
                                        size="small"
                                        // onClick={() =>
                                        //   navigate(AppRoutes.EDITACCOUNT)
                                        // }
                                      />
                                    </Box>
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
          </Container>
        </Box>
      </form>
    </>
  );
};

export default Partners;
