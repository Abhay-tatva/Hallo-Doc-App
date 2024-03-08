import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/,
      "formate is invalid",
    )
    .required("Password is required"),
});
