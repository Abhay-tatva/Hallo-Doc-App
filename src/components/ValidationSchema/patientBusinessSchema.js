import * as Yup from "yup";

export const patientBusinessSchema = Yup.object({
  businessFirstName: Yup.string().required("first Name is required"),
  businessLastName: Yup.string().required("last Name is required"),
  businessPhoneNumber: Yup.string().required("Phone Number is required"),
  businessEmail: Yup.string().required("email is required"),
  businessProperty: Yup.string().required("relation is required"),
  symptoms: Yup.string().required("symptoms is required"),
  patientFirstName: Yup.string().required("symptoms is required"),
  patientLastName: Yup.string().required("symptoms is required"),
  patientemail: Yup.string().required("symptoms is required"),
  patientPhoneNumber: Yup.string().required("symptoms is required"),
  date: Yup.string().required("date of Birth is required"),
  street: Yup.string().required("Street Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string(),
  room: Yup.string(),
});
