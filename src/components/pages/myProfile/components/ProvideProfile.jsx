import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { provideProfileSchema } from "../../../ValidationSchema/ProvideProfileSchema";
import "./provideProfile.css";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import { useSelector } from "react-redux";

const ProvideProfile = ({
  handleClose,
  rows,
  businessName,
  businessWebsite,
  adminNotes,
}) => {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [openModel, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { accountType } = useSelector((state) => state.root.loginReducer);

  const sigCanvas = useRef();

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    setOpenModal(false);
  };
  const download = () => {
    const dlink = document.createElement("a");
    dlink.setAttribute("href", imageURL);
    dlink.setAttribute("download", "signature.png");
    dlink.click();
  };

  // const handleFileChange = (event) => {
  //   console.log("event", event.target.files);
  //   event.preventDefault();
  //   setSelectedFile(event.target.files);
  // };

  const handleUpload = () => {
    // Handle the upload functionality here with the selected file
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        const newFile = {
          id: rows.length + 1,
          document: selectedFile[i].name,
          uploadDate: new Date().toISOString().split("T")[0],
        };
        console.log("New file", newFile);
        rows.push(newFile);
      }
      setSelectedFile(null); // Reset selected file after upload
    }
  };

  const provideProfile = useFormik({
    initialValues: {
      businessName: "",
      businessWebsite: "",
      photo: {},
      signature: {},
      adminNotes: "",
    },
    validationSchema: provideProfileSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("Form submitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
  });
  console.log(provideProfile);

  return (
    <form onSubmit={provideProfile.handleSubmit}>
      <Typography variant="h6">
        <b>Provider Profile</b>
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        margin="2rem"
        justifyContent="center"
      >
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="businessName"
            label="Business Name"
            fullWidth
            className="form-input"
            value={businessName}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="businessWebsite"
            label="Business Website"
            fullWidth
            className="form-input"
            disabled={isDisabled}
            value={businessWebsite}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
                // onChange={handleFileChange}
                multiple
                type="file"
              />
            </Button>

            <Button
              name="Upload"
              variant="contained"
              size="large"
              startIcon={<CloudUploadOutlinedIcon />}
              onClick={handleUpload}
            />
          </Box>
        </Grid>
        <Grid item xs={10} md={4}>
          <Box position="relative" mb={2}>
            <Box display="flex">
              <Button
                fullWidth
                variant="outlined"
                component="label"
                title="Upload-files"
              >
                <input accept="image/*" type="file" />
              </Button>

              <Button
                name="Upload"
                variant="contained"
                size="large"
                startIcon={<CloudUploadOutlinedIcon />}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => setOpenModal(true)}
            name="Create"
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
          />
        </Grid>
        <Grid item xs={5}>
          {openModel && (
            <div className="modalContainer">
              <div className="modal">
                <div className="sigPadContainer">
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{ className: "sigCanvas" }}
                    ref={sigCanvas}
                  />
                  <hr />
                  <button onClick={() => sigCanvas.current.clear()}>
                    Clear
                  </button>
                </div>
                <div className="modal__bottom">
                  <button onClick={() => setOpenModal(false)}>Cancel</button>
                  <button className="create" onClick={create}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
          {imageURL && (
            <>
              <img src={imageURL} alt="signature" className="signature" />
              <br />
              <button
                onClick={download}
                style={{ padding: "5px", marginTop: "5px" }}
              >
                Download
              </button>
            </>
          )}
        </Grid>
        <Grid item lg={12} xs={12} md={12}>
          <FormInput
            name="adminNotes"
            label="Admin Notes"
            fullWidth
            multiline
            rows={5}
            value={adminNotes}
            disabled={isDisabled}
          />
          {accountType === "admin" && (
            <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
              {isDisabled ? (
                <Button
                  name="Edit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsDisabled(false);
                  }}
                />
              ) : (
                <>
                  <Button
                    name="Save"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setIsDisabled(true);
                    }}
                  />
                  <Button
                    name="Cancel"
                    variant="outlined"
                    onClick={() => {
                      setIsDisabled(true);
                    }}
                  />
                </>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ProvideProfile;
