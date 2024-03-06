import * as Yup from "yup";

export const ForgotPassSchema = Yup.object({
  email: Yup.string()
    .email("username must be email")
    .required("Username is required"),
});
