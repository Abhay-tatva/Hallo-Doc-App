import * as Yup from "yup";

export const submitSchema = Yup.object({
  symptoms: Yup.string().required("symptoms is required"),
  submitFirstName: Yup.string().required("symptoms is required"),
  submitLastName: Yup.string().required("symptoms is required"),
  submitemail: Yup.string().required("symptoms is required"),
  submitPhoneNumber: Yup.string().required("symptoms is required"),
  date: Yup.string().required("date of Birth is required"),
  street: Yup.string().required("Street Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string(),
  room: Yup.string(),
});
