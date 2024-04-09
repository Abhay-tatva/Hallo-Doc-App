/* eslint-disable camelcase */

import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import "./createAccess.css";
import { useFormik } from "formik";
// import { CreateAccessSchema } from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  accountAccessPost,
  accountAccessPut,
  getAccountAccessList,
} from "../../../redux/accountAccess/accountAccessApi";
import { clearCreateData } from "../../../redux/slices/accountAccessSlice";
import { AppRoutes } from "../../../constant/route";

const INITIAL_VALUES = {
  role_name: "",
  account_type: "all",
  access_ids: [],
};

const CreateAccess = () => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountListData, createData } = useSelector(
    (state) => state.root.accountAccessReducer,
  );
  const formik = useFormik({
    initialValues,
    // validationSchema: CreateAccessSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(getAccountAccessList(formik.values.account_type));
  }, [dispatch, formik.values.account_type]);

  useEffect(() => {
    setInitialValues({
      role_name: createData.role_name || "",
      account_type: createData.account_type || "all",
      access_ids: createData.accesses?.map((access) => access.access_id) || [],
    });
  }, [createData]);

  const handleChangeRoles = (id) => {
    const newRoles = formik.values.access_ids.includes(id)
      ? formik.values.access_ids.filter(
          (selectedRoleId) => selectedRoleId !== id,
        )
      : [...formik.values.access_ids, id];
    formik.setFieldValue("access_ids", newRoles);
  };

  const handleSave = () => {
    if (createData?.role_id) {
      dispatch(
        accountAccessPut({ role_id: createData.role_id, data: formik.values }),
      ).then((response) => {
        if (response.type === "accountAccessPut/fulfilled") {
          dispatch(clearCreateData());
          navigate(AppRoutes.ACCESSACCOUNT);
        }
      });
    } else {
      dispatch(accountAccessPost(formik.values)).then((response) => {
        if (response.type === "accountAccessPost/fulfilled") {
          dispatch(clearCreateData());
          navigate(AppRoutes.ACCESSACCOUNT);
        }
      });
    }
  };

  return (
    <>
      <Box className="main-createaccess-container">
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="lg" className="createacess-conatiner-wrapper">
            <Box display="flex" justifyContent="space-between" mb="8px">
              <Box display="flex">
                <Typography variant="h5" gutterBottom>
                  <b>Create Role</b>
                </Typography>
              </Box>
              <Button
                name="back"
                variant="outlined"
                startIcon={<ArrowBackIosOutlinedIcon />}
                color="primary"
                onClick={() => {
                  dispatch(clearCreateData());
                  navigate(-1);
                }}
              />
            </Box>
            <Paper className="createacces-full-paper">
              <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="role_name"
                    label="Role Name"
                    fullWidth
                    className="form-input"
                    onChange={formik.handleChange}
                    value={formik.values.role_name}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.role_name &&
                      Boolean(formik.errors.role_name)
                    }
                    helperText={
                      formik.touched.role_name && formik.errors.role_name
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="account_type"
                    label="Account Type"
                    select
                    fullWidth
                    className="form-input"
                    value={formik.values.account_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.account_type &&
                      Boolean(formik.errors.account_type)
                    }
                    helperText={
                      formik.touched.account_type && formik.errors.account_type
                    }
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="physician">Physician</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={12}>
                  {accountListData?.map((role) => {
                    return (
                      <FormControlLabel
                        key={role.access_id}
                        control={
                          <Checkbox
                            checked={formik.values.access_ids.includes(
                              role.access_id,
                            )}
                            onChange={() => handleChangeRoles(role.access_id)}
                          />
                        }
                        label={role.access_name}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button type="submit" name="Save" onClick={handleSave} />
                <Button
                  name="Cancel"
                  variant="outlined"
                  onClick={() => {
                    dispatch(clearCreateData());
                    navigate(AppRoutes.ACCESSACCOUNT);
                  }}
                />
              </Box>
            </Paper>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default CreateAccess;
