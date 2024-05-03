/* eslint-disable camelcase */

import { Box, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";

import { useDispatch, useSelector } from "react-redux";
import { resetPass } from "../../../../redux/myProfileResetPass/myProfileResetPass";
import { toast } from "react-toastify";
import { putProviderResetPassword } from "../../../../redux/provider/providerApi";
import { putMyProfileRessPass } from "../../../../redux/Provider Site/myProfile/myProfileApi";

const INITIAL_VALUES = {
  isAdmin: true,
  userName: "",
  status: "",
  role: "",
  password: "",
};
const Account = ({ userName, status, role, userId, name }) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const { accountType } = useSelector((state) => state.root.loginReducer);

  const dispatch = useDispatch();
  const accountformik = useFormik({
    initialValues,
    validationSchema: myProfileSchema,
    onSubmit: (values) => {
      if (accountType === "admin") {
        if (name === "myProfile") {
          dispatch(
            resetPass({
              user_id: userId,
              password: values.password,
            }),
          ).then((response) => {
            if (response.type === "resetPass/fulfilled") {
              toast.success("password reset successfully.....");
            }
          });
        }

        if (name === "providerProfile") {
          dispatch(
            putProviderResetPassword({
              user_id: userId,
              password: values.password,
            }),
          ).then((response) => {
            if (response.type === "putProviderResetPassword/fulfilled") {
              toast.success("provider password reset successfully....");
            }
          });
        }
      } else if (name === "providerMyProfile") {
        dispatch(putMyProfileRessPass({ password: values.password }))
          .then((response) => {
            if (response.type === "putMyProfileRessPass/fulfilled") {
              toast.success("My Profile Pass reset successfully....");
            }
          })
          .catch((error) => {
            console.error("Error in putMyProfileRessPass:", error);
            toast.error("Failed to reset My Profile Pass.");
          });
      }
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    setInitialValues({
      isAdmin: accountType === "admin",
      userName: userName,
      status: status,
      role: role,
    });
  }, [userName, status, role, accountType]);

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
            onChange={accountformik.handleChange}
            onBlur={accountformik.handleBlur}
            value={accountformik.values.userName}
            error={
              accountformik.touched.userName &&
              Boolean(accountformik.errors.userName)
            }
            helperText={
              accountformik.touched.userName && accountformik.errors.userName
            }
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

        {accountType === "admin" && (
          <>
            <Grid item xs={12} md={6} lg={6}>
              <FormInput
                name="status"
                label="Status"
                select
                fullWidth
                className="form-input"
                onChange={accountformik.handleChange}
                onBlur={accountformik.handleBlur}
                value={accountformik.values.status}
                error={
                  accountformik.touched.status &&
                  Boolean(accountformik.errors.status)
                }
                helperText={
                  accountformik.touched.status && accountformik.errors.status
                }
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="active">Active</MenuItem>
              </FormInput>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormInput
                name="role"
                label="Role"
                select
                fullWidth
                className="form-input"
                onChange={accountformik.handleChange}
                onBlur={accountformik.handleBlur}
                value={accountformik.values.role}
                error={
                  accountformik.touched.role &&
                  Boolean(accountformik.errors.role)
                }
                helperText={
                  accountformik.touched.role && accountformik.errors.role
                }
              >
                <MenuItem value="send_order">Send Order</MenuItem>
                <MenuItem value="dashboard">Dashboard</MenuItem>
                <MenuItem value="localadmin">Local Admin</MenuItem>
              </FormInput>
            </Grid>
          </>
        )}
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
