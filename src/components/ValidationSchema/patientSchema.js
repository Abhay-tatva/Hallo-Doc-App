import * as Yup from "yup";

export const patientSchema = Yup.object({
  symptoms: Yup.string().required("symptoms is required"),
  firstName: Yup.string().required("first Name is required"),
  lastName: Yup.string().required("last Name is required"),
  date: Yup.string().required("date of Birth is required"),
  email: Yup.string().required("email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  street: Yup.string().required("Street Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string(),
  room: Yup.string(),
});
