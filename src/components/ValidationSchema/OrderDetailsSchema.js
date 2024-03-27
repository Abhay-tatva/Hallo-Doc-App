import * as Yup from "yup";

export const orderDetails = Yup.object({
  selectPro: Yup.string().required("selectPro is required"),
  business: Yup.string().required("business is required"),
  orderDetail: Yup.string().required("orderDetail is required"),
  refillNumber: Yup.number().required("refill number is required"),
});
