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
  TableSortLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { FormInput } from "../../TextField/FormInput";
import { columns } from "../../../constant/searchRecordsData";
import "./searchRecords.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSearchRecords,
  getSearchRecords,
} from "../../../redux/records/recordsApi";
import { toast } from "react-toastify";
import { exportRecord } from "../../../redux/export/exportApi";

const initialValues = {
  request_status: "",
  patient_name: "",
  request_type: "",
  from_date_of_service: "",
  to_date_of_service: "",
  provider_name: "",
  phone_no: "",
  email: "",
};
const SearchRecords = () => {
  const [pageNo, setPageNo] = useState(1);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [order, setOrder] = useState("asc");
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = useState("email");

  const { searchRecord } = useSelector((state) => state.root.recordsReducer);

  useEffect(() => setTableData(searchRecord.data), [searchRecord.data]);

  useEffect(() => {
    dispatch(getSearchRecords({ page: pageNo, page_size: rowsPerPage }));
  }, [dispatch, rowsPerPage, pageNo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page) setPageNo(pageNo + 1);
    else setPageNo(pageNo - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        getSearchRecords({
          page: 1,
          page_size: 10,
          request_status: values.request_status,
          patient_name: values.patient_name,
          email: values.email,
          request_type: values.request_type,
          from_date_of_service: values.from_date_of_service,
          provider_name: values.provider_name,
          phone_no: values.phone_no,
        }),
      );
      onSubmitProps.resetForm();
    },
    // validationSchema: createProviderSchema,
  });

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
  const exportFunction = () => {
    dispatch(exportRecord())
      .then((response) => {
        if (response.type === "exportRecord/fulfilled") {
          const blob = new Blob([response.payload], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `All-patients.xlsx`;
          document.body.appendChild;
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        } else {
          console.error("File download failed.");
        }
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
                onClick={exportFunction}
              />
            </Box>
            <Paper className="searchrecord-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Select Request Status"
                    name="request_status"
                    fullWidth
                    select
                    value={formik.values.request_status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.request_status &&
                      Boolean(formik.errors.request_status)
                    }
                    helperText={
                      formik.touched.request_status &&
                      formik.errors.request_status
                    }
                  >
                    <MenuItem value="unassigned">Unassigned</MenuItem>
                    <MenuItem value="assigned">Assigned</MenuItem>
                    <MenuItem value="accepted">Accepted</MenuItem>
                    <MenuItem value="md_on_route">md_on_route</MenuItem>
                    <MenuItem value="md_on_site">md_on_site</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                    <MenuItem value="conclude">Conclude</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                    <MenuItem value="clear">Clear</MenuItem>
                    <MenuItem value="cancelledbyadmin">
                      Cancelled By Admin
                    </MenuItem>
                    <MenuItem value="cancelledbyprovider">
                      Cancelled By Provider
                    </MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Patient Name"
                    name="patient_name"
                    fullWidth
                    value={formik.values.patient_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.patient_name &&
                      Boolean(formik.errors.patient_name)
                    }
                    helperText={
                      formik.touched.patient_name && formik.errors.patient_name
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="select Request Type"
                    name="request_type"
                    fullWidth
                    select
                    value={formik.values.request_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.request_type &&
                      Boolean(formik.errors.request_type)
                    }
                    helperText={
                      formik.touched.request_type && formik.errors.request_type
                    }
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="conclude">Conclude</MenuItem>
                    <MenuItem value="toclose">To Close</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    // label="Form data of service"
                    name="from_date_of_service"
                    fullWidth
                    type="date"
                    value={formik.values.from_date_of_service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.from_date_of_service &&
                      Boolean(formik.errors.from_date_of_service)
                    }
                    helperText={
                      formik.touched.from_date_of_service &&
                      formik.errors.from_date_of_service
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    // label="To Date of Service"
                    name="toServiceDate"
                    fullWidth
                    type="date"
                    value={formik.values.toServiceDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.toServiceDate &&
                      Boolean(formik.errors.toServiceDate)
                    }
                    helperText={
                      formik.touched.toServiceDate &&
                      formik.errors.toServiceDate
                    }
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormInput
                    label="Provider Name"
                    name="provider_name"
                    fullWidth
                    value={formik.values.provider_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.provider_name &&
                      Boolean(formik.errors.provider_name)
                    }
                    helperText={
                      formik.touched.provider_name &&
                      formik.errors.provider_name
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
                    name="phone_no"
                    fullWidth
                    value={formik.values?.phone_no?.toString()}
                    onChange={(event) =>
                      formik.setFieldValue("phone_no", event.target.value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phone_no && Boolean(formik.errors.phone_no)
                    }
                    helperText={
                      formik.touched.phone_no && formik.errors.phone_no
                    }
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    dispatch(getSearchRecords({ page: 1, page_size: 10 }));
                  }}
                >
                  Clear
                </Button>
                <Button variant="contained" type="submit">
                  Search
                </Button>
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

                  <TableBody align="left">
                    {stableSort(tableData, getComparator(order, orderBy))?.map(
                      (row) => {
                        return (
                          <TableRow key={row.sr_no}>
                            {columns?.map((column) => {
                              return (
                                <TableCell key={column.id} align="left">
                                  {column.id === "physicianNote" ||
                                  column.id === "cancelledByProviderNote" ||
                                  column.id === "admin_notes" ||
                                  column.id === "patient_notes" ? (
                                    row.notes
                                      .filter(
                                        (note) =>
                                          note.type_of_note === column.id,
                                      )
                                      ?.map((note, index) => (
                                        <span key={index}>
                                          {note.description}
                                        </span>
                                      ))
                                  ) : column.id === "delete" ? (
                                    <Button
                                      name="delete"
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        dispatch(
                                          deleteSearchRecords(
                                            row.confirmation_no,
                                          ),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "deleteSearchRecords/fulfilled"
                                          ) {
                                            toast.success(
                                              "Records Deleted Successfully",
                                            );

                                            dispatch(
                                              getSearchRecords({
                                                page: 1,
                                                page_size: 10,
                                              }),
                                            );
                                          }
                                        })
                                      }
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
                count={searchRecord.total_count}
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
