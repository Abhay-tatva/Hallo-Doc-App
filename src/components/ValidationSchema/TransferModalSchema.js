import * as Yup from "yup";

export const transferModalSchema = Yup.object({
  isAdmin: Yup.boolean(),
  searchRegion: Yup.string().when("isAdmin", {
    is: true,
    then: (schema) => schema.required("searchRegion must be required"),
  }),
  description: Yup.string().required("description must be required"),
  physician: Yup.string().when("isAdmin", {
    is: true,
    then: (schema) => schema.required("physician must be required"),
  }),
});
