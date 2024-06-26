/* eslint-disable camelcase */
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
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/ButtonInput";
import { columns } from "../../../constant/accessData";
import "./acessAccount.css";
import { AppRoutes } from "../../../constant/route";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAccessDelete,
  accountAccessEdit,
  getAccountAccess,
} from "../../../redux/accountAccess/accountAccessApi";
import { toast } from "react-toastify";

const AccessAccount = () => {
  const [pageNo, setPageNo] = useState(1);
  const [orderBy, setOrderBy] = useState("accountType");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  // const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountData } = useSelector(
    (state) => state.root.accountAccessReducer,
  );
  useEffect(() => setTableData(accountData.data), [accountData]);

  useEffect(() => {
    dispatch(getAccountAccess({ page: pageNo, page_size: rowsPerPage }));
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
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      <Box className="acess-main-container">
        <Container maxWidth="lg" className="access-wrapper-container">
          <Typography variant="h5" gutterBottom>
            <b>Account Access</b>
          </Typography>
          <Paper className="acess-full-paper">
            <Box display="flex" justifyContent="end" p={3}>
              <Button
                onClick={() => navigate(AppRoutes.CREATEACCESS)}
                name="Create Access"
                variant="outlined"
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
                                {column.id === "actions" ? (
                                  <Box
                                    display="flex"
                                    gap={1}
                                    justifyContent="center"
                                  >
                                    <Button
                                      name="Edit"
                                      variant="outlined"
                                      size="small"
                                      onClick={() => {
                                        dispatch(
                                          accountAccessEdit(row.role_id),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "accountAccessEdit/fulfilled"
                                          ) {
                                            navigate(AppRoutes.CREATEACCESS);
                                          }
                                        });
                                      }}
                                    />
                                    <Button
                                      name="delete"
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        dispatch(
                                          accountAccessDelete(row.role_id),
                                        ).then((response) => {
                                          if (
                                            response.type ===
                                            "accountAccessDelete/fulfilled"
                                          ) {
                                            toast.success(
                                              "data Deleted Successfully",
                                            );
                                            dispatch(
                                              getAccountAccess({
                                                page: 1,
                                                page_size: 20,
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
              count={accountData.total_count}
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

export default AccessAccount;
