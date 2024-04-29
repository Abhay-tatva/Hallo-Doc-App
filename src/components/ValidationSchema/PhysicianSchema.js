import * as Yup from "yup";
export const physicianSchema = Yup.object({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string().required("email  is required"),
  phoneNumber: Yup.number().required("phoneNumber  must be  required"),
  medicalLicence: Yup.string().required("medicalLicence  is required"),
  npiNumber: Yup.string(),
  synEmail: Yup.string(),
});
