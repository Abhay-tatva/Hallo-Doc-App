import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";

import {
  Box,
  Checkbox,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { FormInput } from "../../TextField/FormInput";
import "./closeCase.css";
import { viewCloseCaseSchema } from "../../ValidationSchema/validationSchema";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const rows = [
  { id: 1, document: "Document 1", uploadDate: "2024-02-20" },
  { id: 2, document: "Document 2", uploadDate: "2024-02-21" },
];

const initialValues = {
  firstName: "text",
  lastName: "text",
  phonenumber: "6359421917",
  email: "xyz@gamil.com",
  date: "2000-10-2",
};

const CloseCase = () => {
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("uploadDate");
  const [order, setOrder] = useState("asc");
  const [isDisabled, setIsDisabled] = useState(true);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsDisabled(false);
  };
  const handleSave = () => {
    setIsDisabled(true);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleDownload = (document) => {
    console.log("downloading document:", document);
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
  const formik = useFormik({
    initialValues,
    validationSchema: viewCloseCaseSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <>
      <Box className="closecase-main-container">
        <Container maxWidth="lg" className="closecase-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Close Case</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="closecase-container">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box>
                <Typography variant="caption">Patient Name</Typography>
                <Typography variant="h6">
                  <b className="patient-name2">Test AkStageBus</b>
                  (MD101819PRBH0005)
                </Typography>
              </Box>
              <Button
                variant="outlined"
                name="Create Invoice Through Quickbooks"
                size="large"
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
              className="document"
            >
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h6" gutterBottom>
                  <b>Documents</b>
                </Typography>
              </Box>
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
                    <TableCell className="document-cl">Documents</TableCell>
                    <TableCell className="date-cl">
                      <TableSortLabel
                        active={orderBy === "uploadDate"}
                        direction={order}
                        onClick={() => handleRequestSort("uploadDate")}
                      >
                        Upload Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Action</TableCell>
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
                        <TableCell>{row.document}</TableCell>
                        <TableCell>{row.uploadDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleDownload(row.document)}
                          >
                            <CloudDownloadOutlinedIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6">
              <b>Patient Information</b>
            </Typography>
            <form>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                margin="2rem"
                className="divider"
              >
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="firstName"
                    label="First Name"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput type="date" fullWidth className="form-input" />
                </Grid>
                <Grid item sm={12} md={5} lg={5}>
                  <Box
                    display="flex"
                    alignItems="center"
                    className="form-input1"
                  >
                    <FormInput
                      name="phoneNumber"
                      label="Phone Number"
                      fullWidth
                      className="form-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      disabled={isDisabled}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneIphoneIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item sm={12} md={1} lg={1}>
                  <Button variant="outlined" size="large" className="phonebtn">
                    <PhoneIcon />
                  </Button>
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={isDisabled}
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                mt={4}
                className="end-btn"
              >
                <Button
                  name={isDisabled ? "Edit" : "Save"}
                  variant="contained"
                  color="primary"
                  className="form-btn backbtn"
                  onClick={isDisabled ? handleEdit : handleSave}
                />
                <Button
                  name={isDisabled ? "Close Case" : "Cancel"}
                  variant="outlined"
                  onClick={
                    isDisabled
                      ? console.log("Close case button clicked")
                      : () => {
                          formik.setValues(initialValues);
                          setIsDisabled(true);
                        }
                  }
                />
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CloseCase;
