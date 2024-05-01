import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../../Button/ButtonInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  deleteProvider,
  putOnBoarding,
} from "../../../../redux/provider/providerApi";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../constant/route";

const INITIAL_VALUES = {
  IndConAgg: null,
  BacCheak: null,
  HIPAA: null,
  nonDisAgg: null,
  licDoc: null,
};

const OnBording = ({
  userId,
  contractAgree,
  bgCheck,
  hippa,
  nonDisclosure,
  licenceDocument,
}) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accountType } = useSelector((state) => state.root.loginReducer);
  const { physicianData } = useSelector(
    (state) => state.root.providerMenuReducer,
  );
  const data = physicianData;

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("user_id", data.user_id);
      formData.append("independent_contractor_agreement", values.IndConAgg);
      formData.append("background_check", values.BacCheak);
      formData.append("HIPAA", values.HIPAA);
      formData.append("non_disclosure", values.nonDisAgg);
      formData.append("licence_document", values.licDoc);

      dispatch(putOnBoarding(formData));
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      IndConAgg: contractAgree || null,
      BacCheak: bgCheck || null,
      HIPAA: hippa || null,
      nonDisAgg: nonDisclosure || null,
      licDoc: licenceDocument || null,
    });
  }, [contractAgree, bgCheck, hippa, nonDisclosure, licenceDocument]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={3}
      >
        <Typography variant="h6" mb={3} mt={2}>
          <b>Onbording</b>
        </Typography>
        {accountType === "admin" ? (
          <>
            <Box display="flex" gap={2}>
              <Box display="none">
                <input
                  type="file"
                  id="IndConAggFileInput"
                  onChange={(e) => {
                    formik.setFieldValue("IndConAgg", e.target.files[0]);
                  }}
                />

                <input
                  type="file"
                  id="BacCheckFileInput"
                  onChange={(e) => {
                    formik.setFieldValue("BacCheck", e.target.files[0]);
                  }}
                />

                <input
                  type="file"
                  id="HIPAAFileInput"
                  onChange={(e) => {
                    formik.setFieldValue("HIPAA", e.target.files[0]);
                  }}
                />

                <input
                  type="file"
                  id="NonDisAggFileInput"
                  onChange={(e) => {
                    formik.setFieldValue("nonDisAgg", e.target.files[0]);
                  }}
                />

                <input
                  type="file"
                  id="LicenseDocFileInput"
                  onChange={(e) => {
                    formik.setFieldValue("licDoc", e.target.files[0]);
                  }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="IndConAgg"
                    checked={formik.values.IndConAgg}
                    onChange={formik.handleChange}
                  />
                }
                label="Independent Contractor Aggrement"
                sx={{ width: "310px" }}
              />
              <Button
                name="Upload"
                onClick={() =>
                  document.getElementById("IndConAggFileInput").click()
                }
              />
              {formik.values.IndConAgg ? <Button name="View" /> : null}
            </Box>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="BacCheak"
                    checked={formik.values.BacCheak}
                    onChange={formik.handleChange}
                  />
                }
                label="Background Check"
                sx={{ width: "310px" }}
              />
              <Button
                name="Upload"
                onClick={() =>
                  document.getElementById("BacCheckFileInput").click()
                }
              />
              {formik.values.BacCheak ? <Button name="View" /> : null}
            </Box>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="HIPAA"
                    checked={formik.values.HIPAA}
                    onChange={formik.handleChange}
                  />
                }
                label="HIPAA Compliance"
                sx={{ width: "310px" }}
              />
              <Button
                name="Upload"
                onClick={() =>
                  document.getElementById("HIPAAFileInput").click()
                }
              />
              {formik.values.HIPAA ? <Button name="View" /> : null}
            </Box>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="nonDisAgg"
                    checked={formik.values.nonDisAgg}
                    onChange={formik.handleChange}
                  />
                }
                label="Non-Disclosure Agreement"
                sx={{ width: "310px" }}
              />
              <Button
                name="Upload"
                onClick={() =>
                  document.getElementById("NonDisAggFileInput").click()
                }
              />
              {formik.values.nonDisAgg ? <Button name="View" /> : null}
            </Box>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="licDoc"
                    checked={formik.values.licDoc}
                    onChange={formik.handleChange}
                  />
                }
                label="Licence Document"
                sx={{ width: "310px" }}
              />
              <Button
                name="Upload"
                onClick={() =>
                  document.getElementById("LicenseDocFileInput").click()
                }
              />
              {formik.values.licDoc ? <Button name="View" /> : null}
            </Box>{" "}
          </>
        ) : (
          <>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="provider"
                    // checked={checked.provider}
                    onChange={formik.handleChange}
                  />
                }
                label="provider Agreement"
                sx={{ width: "310px" }}
              />
              <Button name="Upload" />
              {/* {checked.provider ? <Button name="View" /> : null} */}
            </Box>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="HIPAA"
                    // checked={checked.HIPAA}
                    onChange={formik.handleChange}
                  />
                }
                label="HIPAA Compliance"
                sx={{ width: "310px" }}
              />
              <Button name="Upload" />
              {/* {checked.HIPAA ? <Button name="View" /> : null} */}
            </Box>
          </>
        )}
        <Divider sx={{ backgroundColor: "black", marginTop: "20px" }} />
        <Box display="flex" justifyContent="end" gap={2} mt={2}>
          <Button name="save" variant="contained" type="submit" />
          <Button
            name="Delete Account"
            variant="contained"
            color="error"
            mt={1}
            onClick={() => {
              dispatch(deleteProvider(data.user_id)).then((response) => {
                if (response.type === "deleteProvider/fulfilled") {
                  navigate(AppRoutes.PROVIDER);
                }
              });
            }}
          />
        </Box>
      </Box>
    </form>
  );
};

export default OnBording;
