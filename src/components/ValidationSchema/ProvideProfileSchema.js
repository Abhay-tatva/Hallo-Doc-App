import * as Yup from "yup";
export const provideProfileSchema = Yup.object().shape({
  businessName: Yup.string().required("Business Name is required"),
  businessWebsite: Yup.string().required("Business website is required"),
  // photo: Yup.mixed().required("Photo  is required"),
  // signature: Yup.mixed().required("Signature  must be  required"),
  adminNotes: Yup.string().required("Admin Notes  is required"),
});
