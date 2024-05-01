/* eslint-disable camelcase */

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
import { FormInput } from "../../TextField/FormInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button } from "../../Button/ButtonInput";
import { columns } from "../../../constant/providerData";
import "./provide.css";
import ContactModal from "../../Modal/ContactModal";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProvider,
  getProviderPhysician,
  putStopNotification,
} from "../../../redux/provider/providerApi";

const Provide = () => {
  const [pageNo, setPageNo] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [additionalFilter, setAdditionalFilter] = useState("all");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("providerName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(-1);
  // const [info, setInfo] = useState({ });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { regions } = useSelector((state) => state.root.regionPhysicianReducer);
  const { providerData } = useSelector(
    (state) => state.root.providerMenuReducer,
  );

  useEffect(() => setTableData(providerData.data), [providerData.data]);
  useEffect(() => {
    dispatch(
      getProvider({
        page: pageNo,
        page_size: rowsPerPage,
        region: additionalFilter,
      }),
    );
  }, [dispatch, additionalFilter, rowsPerPage, pageNo]);

  useEffect(() => {
    const initialSelectedIds = providerData?.data
      ?.filter((data) => data?.stop_notification === "yes")
      ?.map((data) => data?.user_id);
    setSelectedIds(initialSelectedIds);
  }, [providerData]);

  const handleCheckboxChange = (id, stopNotificationStatus) => {
    dispatch(
      putStopNotification({
        user_ids: [id],
        stop_notification_status:
          stopNotificationStatus !== "yes" ? "yes" : "no",
      }),
    ).then((response) => {
      if (response.type === "putStopNotification/fulfilled") {
        dispatch(
          getProvider({
            page: pageNo,
            page_size: rowsPerPage,
            region: additionalFilter,
          }),
        );
      }
    });
  };
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
    stabilizedThis?.sort((a, b) => {
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

  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="provider-main-container">
        <Container maxWidth="lg" className="provider-wrapper-container">
          <Typography variant="h5" gutterBottom>
            <b>Provider Information</b>
          </Typography>
          <Paper className="provider-full-paper">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className="provide-header"
            >
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
              <Button
                name="Create Provider Account"
                onClick={() => {
                  navigate(AppRoutes.CREATEPROVIDER);
                }}
              />
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
                  {stableSort(tableData, getComparator(order, orderBy))?.map(
                    (row) => {
                      return (
                        <TableRow key={row.user_id}>
                          {columns.map((column) => {
                            return (
                              <TableCell key={column.id} align="left">
                                {column.id === "stop_notification" ? (
                                  <Checkbox
                                    checked={
                                      selectedIds?.includes(row?.user_id) &&
                                      row.stop_notification === "yes"
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        row?.user_id,
                                        row?.stop_notification,
                                      )
                                    }
                                  />
                                ) : column.id === "actions" ? (
                                  <Box
                                    display="flex"
                                    gap={1}
                                    alignItems="center"
                                  >
                                    <Button
                                      name="Contact"
                                      variant="outlined"
                                      size="small"
                                      onClick={() => handleOpen(row.user_id)}
                                    />
                                    <Button
                                      name="Edit"
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        dispatch(
                                          getProviderPhysician(row.user_id),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "getProviderPhysician/fulfilled"
                                          ) {
                                            navigate(AppRoutes.EDITACCOUNT);
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
                    },
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={providerData.total_count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
      <ContactModal
        id={id}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  );
};

export default Provide;
