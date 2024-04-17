/* eslint-disable camelcase */

import {
  Box,
  Checkbox,
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
  TableSortLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./blockHistory.css";
import { FormInput } from "../../TextField/FormInput";
import { Button } from "../../Button/ButtonInput";
import { columns } from "../../../constant/blockHistory";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlockHistory,
  putUnblockHistory,
} from "../../../redux/records/recordsApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  phone_no: "",
};
const BlockHistory = () => {
  const [pageNo, setPageNo] = useState(1);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");
  const dispatch = useDispatch();

  const { blockHistory } = useSelector((state) => state.root.recordsReducer);

  useEffect(() => setTableData(blockHistory.data), [blockHistory.data]);

  useEffect(() => {
    dispatch(
      getBlockHistory({
        page: pageNo,
        page_size: rowsPerPage,
        type_of_history: "blocked",
      }),
    );
  }, [dispatch, pageNo, rowsPerPage]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        getBlockHistory({
          page: pageNo,
          page_size: rowsPerPage,
          type_of_history: "blocked",
          name: values.name,
          email: values.email,
          phone_no: values.phone_no,
        }),
      );
      onSubmitProps.resetForm();
    },
  });

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
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
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
      <form onSubmit={formik.handleSubmit}>
        <Box className="records-main-container">
          <Container maxWidth="xl" className="records-wrapper-conatiner">
            <Typography variant="h5" gutterBottom>
              <b>Block History</b>
            </Typography>
            <Paper className="records-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Name"
                    name="name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    name="date"
                    fullWidth
                    type="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Phone Number"
                    name="phone_no"
                    fullWidth
                    value={formik.values?.phone_no?.toString()}
                    onChange={(event) =>
                      formik.setFieldValue("phone_no", event.target.value)
                    }
                    onBlur={formik.handleBlur}
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
                <Button name="Search" type="submit" />
              </Box>
              <TableContainer sx={{ maxHeight: "none" }} component={Paper}>
                <Table>
                  <TableHead style={{ backgroundColor: "#f6f6f6" }}>
                    <TableRow>
                      {columns?.map((column) => (
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

                  <TableBody>
                    {stableSort(tableData, getComparator(order, orderBy))?.map(
                      (row) => {
                        return (
                          <TableRow key={row.id}>
                            {columns?.map((column) => {
                              return (
                                <TableCell key={column.id} align="center">
                                  {column.id === "action" ? (
                                    <Button
                                      name="Unblock"
                                      variant="outlined"
                                      onClick={() => {
                                        dispatch(
                                          putUnblockHistory(
                                            row.request_confirmation_no,
                                          ),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "putUnblockHistory/fulfilled"
                                          ) {
                                            toast.success(
                                              "Case Unblock Successfully",
                                            );
                                            dispatch(
                                              getBlockHistory({
                                                page: pageNo,
                                                page_size: rowsPerPage,
                                                type_of_history: "blocked",
                                              }),
                                            );
                                          }
                                        });
                                      }}
                                    />
                                  ) : column.id === "isActive" ? (
                                    <Checkbox
                                      size="large"
                                      color="primary"
                                      checked={row.isActive}
                                    />
                                  ) : (
                                    row[column.id]
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      },
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={blockHistory.total_count}
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

export default BlockHistory;
