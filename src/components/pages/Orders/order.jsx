import React from 'react';
import Header from '../../Header/Header';
import {useFormik} from 'formik';
import {orderDetails} from '../../ValidationSchema/validationSchema';
import {Box, Grid, MenuItem, Paper, Typography} from '@mui/material';
import {Container} from '@mui/system';
import {Button} from '../../Button/ButtonInput';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {useNavigate} from 'react-router-dom';
import {FormInput} from '../../TextField/FormInput';
import './Order.css';
import {AppRoutes} from '../../../constant/route';
const Order = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      selectPro: '',
      business: '',
      businessContact: '',
      email: '',
      faxNumber: '',
      orderDetail: '',
      retailNumber: '',
    },
    validationSchema: orderDetails,
    onSubmit: (values, onSubmitProps) => {
      console.log('Form Submitted', values);
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
      <Header />
      <Box className="order-main-container">
        <Container maxWidth="lg" className="order-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Send Order</b>
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
          <form onSubmit={formik.handleSubmit}>
            <Paper className="order-paper">
              <Grid container spacing={{xs: 1, md: 2}} className="divider">
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    fullWidth
                    label="Select Profession"
                    select
                    name="selectPro"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.selectPro}
                    error={
                      formik.touched.selectPro &&
                      Boolean(formik.errors.selectPro)
                    }
                  >
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="Teacher">Teacher </MenuItem>
                    <MenuItem value="Business Man">Business Man </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="business"
                    label="Business"
                    fullWidth
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.business}
                    error={
                      formik.touched.business && Boolean(formik.errors.business)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessContact"
                    label="Business Contact"
                    fullWidth
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessContact}
                    error={
                      formik.touched.businessContact &&
                      Boolean(formik.errors.businessContact)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <FormInput
                    name="faxNumber"
                    label="Fax Number"
                    fullWidth
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.faxNumber}
                    error={
                      formik.touched.faxNumber &&
                      Boolean(formik.errors.faxNumber)
                    }
                  />
                </Grid>
              </Grid>
              <Box className="description">
                <FormInput
                  name="orderDetail"
                  label="Prescription or Order details"
                  multiline
                  rows={4}
                  fullWidth
                  //   className="form-input, text-area"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.orderDetail}
                  error={
                    formik.touched.orderDetail &&
                    Boolean(formik.errors.orderDetail)
                  }
                />
              </Box>
              <Grid
                container
                spacing={{xs: 1, md: 2}}
                className="location-info"
              >
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="retailNumber"
                    label="Number Of Refill"
                    fullWidth
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.retailNumber}
                    error={
                      formik.touched.retailNumber &&
                      Boolean(formik.errors.retailNumber)
                    }
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                mt={4}
                className="end-btn"
              >
                <Button
                  name="Submit"
                  variant="contained"
                  className="form-btn viewbtn"
                  type="submit"
                />
                <Button
                  name="Cancle"
                  variant="outlined"
                  className="form-btn"
                  onClick={() => navigate(AppRoutes.DASHBOARD)}
                />
              </Box>
            </Paper>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Order;
