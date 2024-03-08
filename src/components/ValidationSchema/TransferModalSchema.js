import * as Yup from "yup";

export const transferModalSchema = Yup.object({
  searchRegion: Yup.string().required("searchRegion must be required"),
  description: Yup.string().required("description must be required"),
  physician: Yup.string().required("physician must be required"),
});
