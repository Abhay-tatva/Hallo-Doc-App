/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import "./medicalHistory.css";
import {
  Box,
  Container,
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
import { Button } from "../../Button/ButtonInput";
// import { useNavigate } from "react-router-dom";
import { columns } from "../../../constant/medicalData";
import { useDispatch, useSelector } from "react-redux";
import { getMedicalHistory } from "../../../redux/patientSite/patientDashboard/medicalHistoryApi";
import PatientCreateRequest from "../../Modal/patientCreateRequestModal";
import { requestViewCase } from "../../../redux/patientSite/patientDashboard/requestViewDocument";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";

const MedicalHistory = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = useState("createdDate");
  const [order, setOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const { medicalData } = useSelector(
    (state) => state.root.medicalHistoryReducer,
  );
  useEffect(() => setTableData(medicalData), [medicalData]);

  useEffect(() => {
    dispatch(getMedicalHistory({ page: pageNo, page_size: rowsPerPage }));
    return undefined;
  }, [dispatch, pageNo, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) setPageNo(pageNo + 1);
    else setPageNo(pageNo - 1);
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

  const handleOpen = (name) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="medical-main-container">
        <Container maxWidth="lg" className="medical-wrapper-container">
          <Typography variant="h5" gutterBottom>
            <b>Medical History</b>
          </Typography>
          <Paper className="medical-full-paper">
            <Box display="flex" justifyContent="end" p={3}>
              <Button
                name="Create New Request"
                variant="outlined"
                onClick={() => handleOpen("Create New Request")}
              />
            </Box>
            <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                        className="table-head-label"
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={order}
                          onClick={() => handleRequestSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody align="left">
                  {stableSort(tableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row) => {
                      return (
                        <TableRow key={row.role_id}>
                          {columns.map((column) => {
                            return (
                              <TableCell key={column.id} align="center">
                                {column.id === "document" ? (
                                  <Box
                                    display="flex"
                                    gap={1}
                                    justifyContent="center"
                                  >
                                    <Button
                                      name="document"
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        dispatch(
                                          requestViewCase(row.confirmation_no),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "requestViewCase/fulfilled"
                                          ) {
                                            navigate(
                                              AppRoutes.PATIENTVIEWUPLOAD,
                                            );
                                          }
                                        });
                                      }}
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
              count={medicalData?.total_count || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
      <PatientCreateRequest open={open} handleClose={handleClose} />
    </>
  );
};

export default MedicalHistory;
