import * as Yup from "yup";

export const sendAgreementModalSchema = Yup.object({
  phonenumber: Yup.number().required("Pls enter your number"),
  email: Yup.string().required("email  is required"),
});
