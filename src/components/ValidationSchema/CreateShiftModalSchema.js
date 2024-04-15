import * as Yup from "yup";

export const CreateModalSchema = Yup.object({
  searchRegion: Yup.string().required("region must be required"),
  physician: Yup.string().required("Physician  must be required"),
  date: Yup.string().required("date  must be required"),
  startTime: Yup.string().required("startTime  must be required"),
  endTime: Yup.string().required("endTime  must be required"),
  // repeatDays: Yup.string().required("repeatDays  must be required"),
  repeatEnd: Yup.string().required("repeatEnd  must be required"),
});
