/* eslint-disable camelcase */

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
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../../TextField/FormInput";
import { Button } from "../../Button/ButtonInput";
import "./partners.css";
import { columns } from "../../../constant/partnersData";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  deletePartners,
  getBusinessView,
  getPartners,
} from "../../../redux/partners/partnersApi";
import { toast } from "react-toastify";

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const { partnersList } = useSelector((state) => state.root.partnersReducer);

  useEffect(() => setTableData(partnersList.data), [partnersList.data]);

  useEffect(() => {
    dispatch(
      getPartners({
        page: pageNo,
        page_size: rowsPerPage,
        region: additionalFilter,
        vendor: searchTerm,
      }),
    );
  }, [dispatch, additionalFilter, rowsPerPage, pageNo, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) setPageNo(pageNo + 1);
    else setPageNo(pageNo - 1);
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
                          <TableRow key={row.business_id}>
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
                                        onClick={() =>
                                          dispatch(
                                            getBusinessView(row.business_id),
                                          ).then((response) => {
                                            if (
                                              response.type ===
                                              "getBusinessView/fulfilled"
                                            ) {
                                              navigate(AppRoutes.ADDBUSSINESS);
                                            }
                                          })
                                        }
                                      />
                                      <Button
                                        name="Delete"
                                        variant="outlined"
                                        size="small"
                                        onClick={() =>
                                          dispatch(
                                            deletePartners(row.business_id),
                                          ).then((response) => {
                                            if (
                                              response.type ===
                                              "deletePartners/fulfilled"
                                            ) {
                                              toast.success(
                                                "business Deleted Successfully",
                                              );
                                              dispatch(
                                                getPartners({
                                                  page: pageNo,
                                                  page_size: rowsPerPage,
                                                  region: additionalFilter,
                                                }),
                                              );
                                            }
                                          })
                                        }
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
                count={partnersList?.total_count}
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
