import * as Yup from "yup";
export const physicianSchema = Yup.object({
  firstname: Yup.string().required("Username is required"),
  lastname: Yup.string().required("Password is required"),
  email: Yup.string().required("status  is required"),
  phoneNumber: Yup.number().required("Role  must be  required"),
  medicalLicence: Yup.string().required("firstname  is required"),
  npiNumber: Yup.string(),
  synEmail: Yup.string(),
});
