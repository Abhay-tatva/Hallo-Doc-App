import * as Yup from "yup";

export const viewCloseCaseSchema = Yup.object({
  firstName: Yup.string().required("Password is required"),
  lastName: Yup.string().required("Last Name is required"),
  phonenumber: Yup.string().required("Phone number must be  required"),
  email: Yup.string().required("email  is required"),
});
