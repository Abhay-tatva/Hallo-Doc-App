/* eslint-disable camelcase */

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
import { columns } from "../../../constant/smsLogs";
import { useDispatch, useSelector } from "react-redux";
import { getLogs, getRoles } from "../../../redux/records/recordsApi";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  createDate: "",
  sendate: "",
  searchByRole: "",
  reciverName: "",
};
const SmsLogs = () => {
  const [pageNo, setPageNo] = useState(1);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logs } = useSelector((state) => state.root.recordsReducer);
  const { rolesDate } = useSelector((state) => state.root.recordsReducer);

  useEffect(() => setTableData(logs.data), [logs.data]);
  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        getLogs({
          page: pageNo,
          page_size: rowsPerPage,
          type_of_log: "email",
          sent_date: values.sendate,
          search_by_role: values.searchByRole,
          receiver_name: values.reciverName,
          email_id: values.email,
          // phone_no: values.phone_no,
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
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
                onClick={() => navigate(-1)}
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
                    onChange={(e) =>
                      formik.setFieldValue("searchByRole", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.searchByRole}
                  >
                    {rolesDate?.map((role) => (
                      <MenuItem key={role.role_id} value={role.role_name}>
                        {role.role_name}
                      </MenuItem>
                    ))}
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    label="Receiver Name"
                    name="reciverName"
                    fullWidth
                    value={formik.values.reciverName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.reciverName &&
                      Boolean(formik.errors.reciverName)
                    }
                    helperText={
                      formik.touched.reciverName && formik.errors.reciverName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    label="Email Id"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    // label="Created Date"
                    name="createDate"
                    fullWidth
                    type="date"
                    value={formik.values.createDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.createDate &&
                      Boolean(formik.errors.createDate)
                    }
                    helperText={
                      formik.touched.createDate && formik.errors.createDate
                    }
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormInput
                    // label="Send date"
                    name="sendate"
                    fullWidth
                    type="date"
                    value={formik.values.sendate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.sendate && Boolean(formik.errors.sendate)
                    }
                    helperText={formik.touched.sendate && formik.errors.sendate}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="contained" type="submit">
                      Search
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={(values) => {
                        formik.resetForm();
                        dispatch(
                          getLogs({
                            page: pageNo,
                            page_size: rowsPerPage,
                            type_of_log: "email",
                            sent_date: values.sendate,
                            search_by_role: values.searchByRole,
                            receiver_name: values.reciverName,
                            email_id: values.email,
                          }),
                        );
                      }}
                    >
                      Clear
                    </Button>
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
                    {tableData?.map((row) => {
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
                count={tableData?.length}
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
