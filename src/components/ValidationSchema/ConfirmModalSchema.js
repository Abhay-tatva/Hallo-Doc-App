import * as Yup from "yup";

export const confirmBlockModalSchema = Yup.object({
  blockRequest: Yup.string().required("Pls provide resions"),
});
