import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const ForgotPassSchema = Yup.object({
  username: Yup.string().required("Username is required"),
});

export const viewReservationSchema = Yup.object({
  patientNotes: Yup.string().required("Username is required"),
  firstName: Yup.string().required("Password is required"),
  lastName: Yup.string().required("Last Name is required"),
  phonenumber: Yup.string().required("Phone number must be  required"),
  email: Yup.string().required("email  is required"),
  region: Yup.string().required("region is required"),
  business: Yup.string().required("business is required"),
  room: Yup.string().required("room is required"),
});
export const viewNotesSchema = Yup.object({
  adminNotes: Yup.string().required("Admin  Notes in required"),
});

export const assignModalSchema = Yup.object({
  searchRegion: Yup.string().required("searchRegion must be required"),
  description: Yup.string().required("description must be required"),
  physician: Yup.string().required("physician must be required"),
});
export const cancelModalSchema = Yup.object({
  additionalnotes: Yup.string().required("additionalnotes must be required"),
  canelReason: Yup.string().required("canelReason must be required"),
});
export const confirmBlockModalSchema = Yup.object({
  blockRequest: Yup.string().required("Pls provide resions"),
});
