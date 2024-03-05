import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const ProvideProfile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  //   const [selected, setSelected] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);

  const handleFileChange = (event) => {
    console.log("event", event.target.files);
    event.preventDefault();
    setSelectedFile(event.target.files);
  };

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

  //   const provideFormik = useFormik({
  //     initialValues: {
  //       businessName: "",
  //       businessWebsite: "",
  //     },
  //   });

  return (
    <form>
      <Typography variant="h6">
        <b>Provider Profile</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="businessName"
            label="Business Name"
            fullWidth
            className="form-input"
            // value={billformik.values.address1}
            // disabled={isDisabled}
            // onChange={billformik.handleChange}
            // onBlur={billformik.handleBlur}
            // error={
            //   billformik.touched.address1 && Boolean(billformik.errors.address1)
            // }
            // helperText={
            //   billformik.touched.address1 && billformik.errors.address1
            // }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="businessWebsite"
            label="Business Website"
            fullWidth
            className="form-input"
            // value={billformik.values.address1}
            // disabled={isDisabled}
            // onChange={billformik.handleChange}
            // onBlur={billformik.handleBlur}
            // error={
            //   billformik.touched.address1 && Boolean(billformik.errors.address1)
            // }
            // helperText={
            //   billformik.touched.address1 && billformik.errors.address1
            // }
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
      </Grid>
    </form>
  );
};

export default ProvideProfile;
