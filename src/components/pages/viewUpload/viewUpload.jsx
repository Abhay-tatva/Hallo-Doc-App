/* eslint-disable camelcase */

import React, { useState } from "react";
import { Button } from "../../Button/ButtonInput";
import {
  Box,
  Container,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";

import "./viewUpload.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  viewUpdate,
  viewUpload,
} from "../../../redux/viewUpload/viewUploadApi";
import {
  downloadAll,
  singleDownload,
} from "../../../redux/downloadCase/downloadApi";
import { deleteAll, singleDelete } from "../../../redux/deleteCase/deleteApi";

const ViewUpload = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("uploadDate");
  const navigate = useNavigate();
  const selector = useSelector((state) => state.root.viewuploadReducer);
  const rows = selector.uploadFile[0]?.documents;
  const dispatch = useDispatch();

  const { confirmationNo, patientData } = selector.uploadFile[0];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

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
  // console.log(selectedFile);
  // }

  // const handleFileChange = (event) => {
  //   console.log("event", event.target.files);
  //   event.preventDefault();
  //   setSelectedFile(event.target.files);
  // };
  // Handle the upload functionality here with the selected file
  // const handleUpload = () => {
  //   dispatch(viewUpdate({ confirmation_no, file: selectedFile }));
  // };
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    dispatch(viewUpdate({ confirmationNo, formData })).then((response) => {
      if (response.type === "viewUpdate/fulfilled") {
        dispatch(viewUpload(confirmationNo));
      }
    });
    setSelectedFile(null);
  };

  const handleDownload = (documentId) => {
    dispatch(
      singleDownload({
        confirmation_no: confirmationNo,
        document_id: documentId,
      }),
    )
      .then((response) => {
        if (response.type === "singleDownload/fulfilled") {
          // Assuming the binary data you received is an image,
          // we set the MIME type to 'image/jpeg' for a JPG file.
          const blob = new Blob([response.payload], {
            type: "image/jpeg",
          });

          // Create a new link element for downloading
          const downloadLink = document.createElement("a");
          document.body.appendChild(downloadLink);
          const url = URL.createObjectURL(blob);

          // Set the download attribute with a filename
          downloadLink.href = url;
          downloadLink.download = `downloaded-image.jpg`;

          // Programmatically click the link to trigger the download
          downloadLink.click();

          // Revoke the object URL and remove the link element after the download
          setTimeout(() => {
            URL.revokeObjectURL(url);
            document.body.removeChild(downloadLink);
          }, 100);

          // Optionally, display a success message
          // toast.success("Image downloaded successfully.");
        } else {
          // Handle any other action types like errors
          console.error("Image download failed.");
        }
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const handleDelete = (id) => {
    dispatch(
      singleDelete({
        confirmation_no: confirmationNo,
        document_id: id,
      }),
    ).then((response) => {
      if (response.type === "singleDelete/fulfilled") {
        dispatch(viewUpload(confirmationNo));
      }
    });
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll(confirmationNo)).then((response) => {
      console.log("abhay", response);
      if (response.type === "deleteAll/fulfilled") {
        dispatch(viewUpload(confirmationNo));
      }
    });
  };

  const handleDownloadAll = () => {
    dispatch(downloadAll(confirmationNo));
  };

  // const handleSendMail = () => {
  //   console.log("Sending mail...");
  // };
  return (
    <>
      <Box className="upload-main-container">
        <Container maxWidth="lg" className="upload-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Documents</b>
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
          <Paper className="upload-container">
            <Typography variant="caption">Patient Name</Typography>
            <Typography variant="h6">
              <b className="patient-name">{patientData?.name}</b>(
              {confirmationNo})
            </Typography>
            <Typography variant="body2" marginTop="10px">
              Check here to review and add files that you or the Client/Member
              has attached to the Request.
            </Typography>

            <form onSubmit={handleUpload}>
              <Box position="relative" mb={2} mt={2}>
                <Box display="flex">
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    className="upload-btn"
                    title="Upload-files"
                  >
                    <input
                      // accept="image/*"
                      onChange={(e) => {
                        e.preventDefault();
                        setSelectedFile(e.target.files[0]);
                      }}
                      multiple
                      type="file"
                    />
                  </Button>

                  <Button
                    name="Upload"
                    variant="contained"
                    size="large"
                    startIcon={<CloudUploadOutlinedIcon />}
                    type="submit"
                  />
                </Box>
              </Box>
            </form>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
            >
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h6" gutterBottom>
                  <b>Documents</b>
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Button
                  name="Download All"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDownloadAll("all")}
                />
                <Button
                  name="Delete All"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDeleteAll("all")}
                />
                <Button name="Send Mail" variant="outlined" color="primary" />
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
                      <TableRow key={row.document_id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(row.document_id)}
                            onClick={(event) =>
                              handleClick(event, row.document_id)
                            }
                          />
                        </TableCell>
                        <TableCell>{row.document_path}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleDownload(row.document_id)}
                          >
                            <CloudDownloadOutlinedIcon />
                          </Button>
                          &nbsp;
                          <Button
                            variant="outlined"
                            onClick={() => handleDelete(row.document_id)}
                          >
                            <DeleteOutlinedIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ViewUpload;
