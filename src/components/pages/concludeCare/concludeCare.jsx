import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import React, { useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./concludeCare.css";
import { useState } from "react";
import {
  getConcludeCare,
  postConcludeCare,
} from "../../../redux/Provider Site/concludeCare/concludeCareApi";

const ConcludeCare = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState({});
  const selector = useSelector((state) => state.root.viewuploadReducer);
  const rows = selector?.uploadFile[0]?.documents;
  const { confirmationNo, physicianData } = selector.uploadFile[0];
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    dispatch(postConcludeCare({ confirmationNo, formData })).then(
      (response) => {
        if (response.type === "postConcludeCare/fulfilled") {
          dispatch(getConcludeCare(confirmationNo));
        }
      },
    );
    setSelectedFile(null);
  };
  const handleDownload = (documentId) => {
    // dispatch(
    //   singleDownload({
    //     confirmation_no: confirmationNo,
    //     document_id: documentId,
    //   }),
    // )
    //   .then((response) => {
    //     if (response.type === "singleDownload/fulfilled") {
    //       // Assuming the binary data you received is an image,
    //       // we set the MIME type to 'image/jpeg' for a JPG file.
    //       const blob = new Blob([response.payload], {
    //         type: "image/png",
    //       });
    //       // Create a new link element for downloading
    //       const downloadLink = document.createElement("a");
    //       document.body.appendChild(downloadLink);
    //       const url = URL.createObjectURL(blob);
    //       // Set the download attribute with a filename
    //       downloadLink.href = url;
    //       downloadLink.download = `downloaded-image.png`;
    //       // Programmatically click the link to trigger the download
    //       downloadLink.click();
    //       // Revoke the object URL and remove the link element after the download
    //       setTimeout(() => {
    //         URL.revokeObjectURL(url);
    //         document.body.removeChild(downloadLink);
    //       }, 100);
    //       // Optionally, display a success message
    //       // toast.success("Image downloaded successfully.");
    //     } else {
    //       // Handle any other action types like errors
    //       console.error("Image download failed.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading image:", error);
    //   });
  };

  const handleDelete = (id) => {
    // dispatch(
    //   singleDelete({
    //     confirmation_no: confirmationNo,
    //     document_id: id,
    //   }),
    // ).then((response) => {
    //   if (response.type === "singleDelete/fulfilled") {
    //     dispatch(viewUpload(confirmationNo));
    //   }
    // });
  };
  return (
    <>
      <Box className="conclude-main-container">
        <Container maxWidth="lg" className="conclude-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Conclude Care</b>
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
          <Paper className="conlcude-paper-container">
            <Typography variant="caption">Patient Name</Typography>
            <Typography variant="h6">
              <b className="patient-name">{physicianData?.patient_name}</b>
            </Typography>
            <form onSubmit={handleUpload}>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                flexWrap="wrap"
              >
                <Box display="flex" flexWrap="wrap">
                  <Typography variant="h6" gutterBottom>
                    <b>Encounter Forms</b>
                  </Typography>
                </Box>

                {/* <Box display="flex"> */}
                {/* <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    className="upload-btn"
                    title="Upload-files"
                  > */}

                {/* </Button> */}

                <Button
                  name="Upload"
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadOutlinedIcon />}
                  type="submit"
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
                {/* </Box> */}
              </Box>
            </form>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="document-cl">Documents</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => (
                    <TableRow key={row.document_id} hover>
                      <TableCell>{row.document_path}</TableCell>
                      {/* <TableCell>{row.createdAt}</TableCell> */}
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ConcludeCare;
