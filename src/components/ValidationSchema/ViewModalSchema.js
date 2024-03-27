import * as Yup from "yup";

export const ViewModalSchema = Yup.object({
  searchRegion: Yup.string().required("region must be required"),
  physician: Yup.string().required("Physician  must be required"),
});
