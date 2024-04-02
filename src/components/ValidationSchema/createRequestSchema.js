import * as Yup from "yup";

export const createRequestSchema = Yup.object({
  firstName: Yup.string().required("first Name is required"),
  lastName: Yup.string().required("last Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().required("email is required"),
  dateOfBirth: Yup.string().required("date of Birth is required"),
  street: Yup.string().required("Street Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string(),
  room: Yup.string(),
  notes: Yup.string(),
});
