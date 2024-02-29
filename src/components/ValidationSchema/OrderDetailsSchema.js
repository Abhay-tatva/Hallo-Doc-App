import * as Yup from "yup";

export const orderDetails = Yup.object({
  selectPro: Yup.string().required("selectPro is required"),
  business: Yup.string().required("business is required"),
  businessContact: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    // .min(8)
    .required("businessContact is required"),
  faxNumber: Yup.string().required("faxNumber must be  required"),
  email: Yup.string().required("email  is required"),
  orderDetail: Yup.string().required("orderDetail is required"),
  retailNumber: Yup.string().required("Retail number is required"),
});
