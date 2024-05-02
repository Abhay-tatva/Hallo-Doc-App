import * as Yup from "yup";
export const myProfileSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  status: Yup.string().required("status  is required"),
  role: Yup.string().required("Role  must be  required"),
});

export const accountMyProfileSchema = Yup.object({
  firstName: Yup.string().required("firstname  is required"),
  lastName: Yup.string().required("lastname is required"),
  email: Yup.string().required("email is required"),
  confirmeMail: Yup.string().required("confirmemail is required"),
  mobileNo: Yup.string().required("phoneNumber is required"),
});

export const addressSchema = Yup.object({
  address1: Yup.string().required("address1 is required"),
  address2: Yup.string().required("address2 is required"),
  city: Yup.string().required("city is required"),
  state: Yup.string().required("state is required"),
  zip: Yup.string().required("zip is required"),
});
