import * as Yup from "yup";
export const viewReservationSchema = Yup.object({
  patientNotes: Yup.string().required("Username is required"),
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phonenumber: Yup.string().required("Phone number must be  required"),
  email: Yup.string().required("email  is required"),
  region: Yup.string().required("region is required"),
  business: Yup.string().required("business is required"),
  room: Yup.string().required("room is required"),
});
