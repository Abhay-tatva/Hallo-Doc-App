/* eslint-disable camelcase */

import React from "react";
import BasicModal from "./Modal";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FormInput } from "../TextField/FormInput";
import { Button } from "../Button/ButtonInput";
import { useFormik } from "formik";
import { contactModalSchema } from "../ValidationSchema/index";
import { useDispatch } from "react-redux";
import { postContactProvider } from "../../redux/provider/providerApi";

const ContactModal = ({ open, handleClose, handleOpen, id }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: "",
      communicationMethod: "email",
    },
    validationSchema: contactModalSchema,
    onSubmit: (values, onSubmitProps) => {
      dispatch(
        postContactProvider({
          communicationMethod: formik.values.communicationMethod,
          message: formik.values.message,
          user_id: id,
        }),
      );
      onSubmitProps.resetForm();
      handleClose();
    },
  });

  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      header="Conatct Your Provider"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" p={2} gap={3}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose communication to send message
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="sms"
              // name="radio-buttons-group"
              name="communicationMethod"
              value={formik.values.communicationMethod}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel value="both" control={<Radio />} label="Both" />
            </RadioGroup>
          </FormControl>
          <FormInput
            name="message"
            label="Message"
            fullWidth
            multiline
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button name="Send" type="submit" variant="contained" />
            <Button name="Cancel" variant="outlined" onClick={handleClose} />
          </Box>
        </Box>
      </form>
    </BasicModal>
  );
};

export default ContactModal;
