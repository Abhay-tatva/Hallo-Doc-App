import * as Yup from "yup";

export const CreateModalSchema = Yup.object({
  searchRegion: Yup.string().required("region must be required"),
  physician: Yup.string().required("Physician  must be required"),
  date: Yup.string().required("date  must be required"),
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string()
    .required("End Time is required")
    .when("startTime", (startTime, schema) => {
      return schema.test({
        name: "is-greater",
        exclusive: true,
        message: "End time must be greater than start time",
        test: function (endTime) {
          return endTime > startTime;
        },
      });
    }),
  // repeatDays: Yup.string().required("repeatDays  must be required"),
  repeatEnd: Yup.string().required("repeatEnd  must be required"),
});
