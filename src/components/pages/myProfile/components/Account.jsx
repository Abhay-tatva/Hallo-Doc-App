/* eslint-disable camelcase */

import { Box, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";

import { useDispatch } from "react-redux";
import { resetPass } from "../../../../redux/myProfileResetPass/myProfileResetPass";
const INITIAL_VALUES = {
  userName: "",
  status: "",
  role: "",
};
const Account = ({ userName, status, role, userId }) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  console.log("userid", userId);
  const dispatch = useDispatch();
  const accountformik = useFormik({
    initialValues,
    validationSchema: myProfileSchema,
    onSubmit: (values) => {
      dispatch(
        resetPass({
          user_id: userId,
          password: values.password,
        }),
      );
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    setInitialValues({
      userName: userName,
      status: status,
      role: role,
    });
  }, [userName, status, role]);

  return (
    <form onSubmit={accountformik.handleSubmit}>
      <Typography variant="h6" className="account">
        <b>Account Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="userName"
            label="User Name"
            fullWidth
            className="form-input"
            value={userName}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="password"
            label="Password"
            fullWidth
            className="form-input"
            onChange={accountformik.handleChange}
            onBlur={accountformik.handleBlur}
            value={accountformik.values.password}
            error={
              accountformik.touched.password &&
              Boolean(accountformik.errors.password)
            }
            helperText={
              accountformik.touched.password && accountformik.errors.password
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="status"
            label="Status"
            select
            fullWidth
            className="form-input"
            value={status}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="unactive">UnActive</MenuItem>
          </FormInput>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="role"
            label="Role"
            select
            fullWidth
            className="form-input"
            value={role}
          >
            <MenuItem value="send_order">Send Order</MenuItem>
            <MenuItem value="dashboard">Dashboard</MenuItem>
            <MenuItem value="localadmin">Local Admin</MenuItem>
          </FormInput>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          name="Reset Password"
          variant="outlined"
          color="primary"
          type="submit"
        />
      </Box>
    </form>
  );
};

export default Account;
