/* eslint-disable camelcase */
import React from "react";
import { useFormik } from "formik";
import { orderDetails } from "../../ValidationSchema/index";
import { Box, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Button } from "../../Button/ButtonInput";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../TextField/FormInput";
import "./Order.css";
import { AppRoutes } from "../../../constant/route";
import { useDispatch, useSelector } from "react-redux";
import { sendOrderBussiness } from "../../../redux/professionBussiness/getProfessionBussinessApi";
import {
  getSendOrder,
  postSendOrder,
} from "../../../redux/sendOrder/sendOrderApi";
const Order = () => {
  const navigate = useNavigate();
  const { professions } = useSelector(
    (state) => state.root.professionBussinessReducer,
  );
  const { bussinesses } = useSelector(
    (state) => state.root.professionBussinessReducer,
  );
  const { business_contact, email, fax_number } = useSelector(
    (state) => state.sendOrderReducer,
  );
  const { confirmation_no, request_state } = useSelector(
    (state) => state.root.commonReducer,
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      selectPro: "",
      business: "",
      orderDetail: "",
      refillNumber: "",
    },
    validationSchema: orderDetails,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postSendOrder({
          request_state,
          confirmation_no,
          business_contact,
          email,
          order_details: values.orderDetail,
          number_of_refill: values.refillNumber,
        }),
      ).then((response) => {
        if (response.type === "postSendOrder/fulfilled")
          navigate(AppRoutes.DASHBOARD);
      });
      onSubmitProps.resetForm();
    },
  });
  return (
    <>
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
              <Grid container spacing={{ xs: 1, md: 2 }} className="divider">
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
                    helperText={
                      formik.touched.selectPro && formik.errors.selectPro
                    }
                  >
                    {professions?.map((profession, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={profession.profession_name}
                          onClick={() =>
                            dispatch(
                              sendOrderBussiness(profession.profession_name),
                            )
                          }
                        >
                          {profession.profession_name}
                        </MenuItem>
                      );
                    })}
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="business"
                    label="Business"
                    fullWidth
                    select
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.business}
                    error={
                      formik.touched.business && Boolean(formik.errors.business)
                    }
                    helperText={
                      formik.touched.business && formik.errors.business
                    }
                  >
                    {bussinesses &&
                      bussinesses?.map((bussiness, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={bussiness.business_name}
                            onClick={() =>
                              dispatch(
                                getSendOrder({
                                  profession: formik.values.selectPro,
                                  business: bussiness.business_name,
                                }),
                              )
                            }
                          >
                            {bussiness.business_name}
                          </MenuItem>
                        );
                      })}
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="businessContact"
                    label="Business Contact"
                    fullWidth
                    value={business_contact}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <FormInput
                    name="email"
                    label="Email"
                    fullWidth
                    // className="form-input"
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                  <FormInput
                    name="faxNumber"
                    label="Fax Number"
                    fullWidth
                    // className="form-input"
                    disabled
                    value={fax_number}
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
                  helperText={
                    formik.touched.businessContact &&
                    formik.errors.businessContact
                  }
                />
              </Box>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                className="location-info"
              >
                <Grid item xs={12} md={6}>
                  <FormInput
                    name="refillNumber"
                    label="Number Of Refill"
                    fullWidth
                    // className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.refillNumber}
                    error={
                      formik.touched.refillNumber &&
                      Boolean(formik.errors.refillNumber)
                    }
                    helperText={
                      formik.touched.businessContact &&
                      formik.errors.businessContact
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
