import * as Yup from "yup";

export const requestModalSchema = Yup.object({
  message: Yup.string().required("Pls provide resions"),
});
