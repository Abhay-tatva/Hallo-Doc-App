import * as Yup from "yup";

export const sendLinkModalSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name must be required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name must be required"),
  phoneNumber: Yup.number().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("pls enter your email"),
});
