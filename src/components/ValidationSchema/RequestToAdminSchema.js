import * as Yup from "yup";

export const requestToAdminModalSchema = Yup.object({
  message: Yup.string().required("message must be required"),
});
