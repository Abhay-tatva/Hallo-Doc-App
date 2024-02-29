import * as Yup from "yup";

export const ForgotPassSchema = Yup.object({
  username: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,16}$/,
      "formate is invalid"
    )
    .required("Username is required"),
});
