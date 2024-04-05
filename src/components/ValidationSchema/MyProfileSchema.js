import * as Yup from "yup";
export const myProfileSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  status: Yup.string().required("status  is required"),
  Role: Yup.string().required("Role  must be  required"),
});

export const accountMyProfileSchema = Yup.object({
  firstname: Yup.string().required("firstname  is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string().required("email is required"),
  confirmemail: Yup.string().required("confirmemail is required"),
  phoneNumber: Yup.string().required("phoneNumber is required"),
});

export const addressSchema = Yup.object({
  address1: Yup.string().required("address1 is required"),
  address2: Yup.string().required("address2 is required"),
  city: Yup.string().required("city is required"),
  state: Yup.string().required("state is required"),
  zip: Yup.string().required("zip is required"),
});
