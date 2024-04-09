/* eslint-disable camelcase */

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
import { columns } from "../../../constant/recordsData";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getPatientHistory } from "../../../redux/records/recordsApi";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};
const Records = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientHistoryData } = useSelector(
    (state) => state.root.recordsReducer,
  );

  useEffect(() => {
    dispatch(getPatientHistory({ page: 1, page_size: 10 }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      onSubmitProps.resetForm();
    },
    // validationSchema: createProviderSchema,
  });
  useEffect(() => setTableData(patientHistoryData), [patientHistoryData]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box className="records-main-container">
          <Container maxWidth="xl" className="records-wrapper-conatiner">
            <Typography variant="h5" gutterBottom>
              <b>Patient History</b>
            </Typography>
            <Paper className="records-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
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
                    name="phoneNumber"
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={(value) =>
                      formik.setFieldValue("phoneNumber", value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
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
