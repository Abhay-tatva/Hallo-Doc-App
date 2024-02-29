import * as Yup from "yup";

export const cancelModalSchema = Yup.object({
  additionalnotes: Yup.string().required("additionalnotes must be required"),
  canelReason: Yup.string().required("canelReason must be required"),
});
