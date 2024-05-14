/* eslint-disable camelcase */

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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProviderPhysician,
  putPhotoUpdate,
  putProviderInfo,
} from "../../../../redux/provider/providerApi";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  businessName: "",
  businessWebsite: "",
  photo: null,
  signature: null,
  adminNotes: "",
};

const ProvideProfile = ({
  handleClose,
  rows,
  businessName,
  businessWebsite,
  adminNotes,
  userId,
}) => {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [openModel, setOpenModal] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
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

  const provideProfile = useFormik({
    initialValues,
    validationSchema: provideProfileSchema,
    onSubmit: (values, onSubmitProps) => {
      console.log("Form submitted", values);
      onSubmitProps.resetForm();
      handleClose();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      businessName: businessName,
      businessWebsite: businessWebsite,
      photo: null,
      signature: null,
      adminNotes: adminNotes,
    });
  }, [businessName, businessWebsite, adminNotes]);
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
            value={provideProfile.values.businessName}
            disabled={isDisabled}
            onChange={provideProfile.handleChange}
            onBlur={provideProfile.handleBlur}
            error={
              provideProfile.touched.businessName &&
              Boolean(provideProfile.errors.businessName)
            }
            helperText={
              provideProfile.touched.businessName &&
              provideProfile.errors.businessName
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="businessWebsite"
            label="Business Website"
            fullWidth
            className="form-input"
            value={provideProfile.values.businessWebsite}
            disabled={isDisabled}
            onChange={provideProfile.handleChange}
            onBlur={provideProfile.handleBlur}
            error={
              provideProfile.touched.businessWebsite &&
              Boolean(provideProfile.errors.businessWebsite)
            }
            helperText={
              provideProfile.touched.businessWebsite &&
              provideProfile.errors.businessWebsite
            }
          />
        </Grid>
        {accountType === "admin" || accountType === "physician" ? (
          <>
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
                    onChange={(e) =>
                      provideProfile.setFieldValue("photo", e.target.files[0])
                    }
                    multiple
                    type="file"
                  />
                </Button>

                <Button
                  name="Upload"
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadOutlinedIcon />}
                  onClick={() => {
                    const formData = new FormData();
                    formData.append(
                      "profile_picture",
                      provideProfile.values.photo,
                    );
                    dispatch(putPhotoUpdate({ userId, formData })).then(
                      (response) => {
                        if (response.type === "putPhotoUpdate/fulfilled") {
                          toast("profile photo updated Successfully..");
                          dispatch(getProviderPhysician(userId));
                        }
                      },
                    );
                  }}
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
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) =>
                        provideProfile.setFieldValue(
                          "signature",
                          e.target.files[0],
                        )
                      }
                    />
                  </Button>

                  <Button
                    name="Upload"
                    variant="contained"
                    size="large"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={() => {
                      const formData = new FormData();
                      formData.append(
                        "signature_photo",
                        provideProfile.values.signature,
                      );
                      dispatch(putPhotoUpdate({ userId, formData })).then(
                        (response) => {
                          if (response.type === "putPhotoUpdate/fulfilled") {
                            toast("Signature  updated Successfully..");
                            dispatch(getProviderPhysician(userId));
                          }
                        },
                      );
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </>
        ) : null}
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
            value={provideProfile.values.adminNotes}
            disabled={isDisabled}
            onChange={provideProfile.handleChange}
            onBlur={provideProfile.handleBlur}
            error={
              provideProfile.touched.adminNotes &&
              Boolean(provideProfile.errors.adminNotes)
            }
            helperText={
              provideProfile.touched.adminNotes &&
              provideProfile.errors.adminNotes
            }
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
                      dispatch(
                        putProviderInfo({
                          user_id: userId.toString(),
                          data: provideProfile.values,
                        }),
                      ).then((response) => {
                        if (response.type === "putProviderInfo/fulfilled") {
                          dispatch(getProviderPhysician(userId));
                        }
                      });
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
