import { Box, Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import { FormInput } from "../../../TextField/FormInput";
import { Button } from "../../../Button/ButtonInput";
import { useFormik } from "formik";
import { myProfileSchema } from "../../../ValidationSchema/MyProfileSchema";

const Account = () => {
  const accountformik = useFormik({
    initialValues: {
      username: "",
      password: "",
      status: "",
      Role: "",
    },
    validationSchema: myProfileSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });
  return (
    <form>
      <Typography variant="h6" className="account">
        <b>Account Information</b>
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} margin="2rem">
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="username"
            label="User Name"
            fullWidth
            className="form-input"
            onChange={accountformik.handleChange}
            onBlur={accountformik.handleBlur}
            value={accountformik.values.username}
            error={
              accountformik.touched.username &&
              Boolean(accountformik.errors.username)
            }
            helperText={
              accountformik.touched.username && accountformik.errors.username
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
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="unactive">UnActive</MenuItem>
          </FormInput>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            name="Role"
            label="Role"
            select
            fullWidth
            className="form-input"
            onChange={accountformik.handleChange}
            onBlur={accountformik.handleBlur}
            error={
              accountformik.touched.Role && Boolean(accountformik.errors.Role)
            }
            helperText={accountformik.touched.Role && accountformik.errors.Role}
          >
            <MenuItem value="masteradmin">Master Admin</MenuItem>
            <MenuItem value="localadmin">Local Admin</MenuItem>
          </FormInput>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button name="Reset Password" variant="outlined" color="primary" />
      </Box>
    </form>
  );
};

export default Account;
