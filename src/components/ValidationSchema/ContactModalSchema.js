import * as Yup from "yup";

export const contactModalSchema = Yup.object({
  message: Yup.string().required("message must be required"),
});
