import * as Yup from "yup";

export const CreateAccessSchema = Yup.object({
  rolename: Yup.string().required("Role Name is required"),
  role: Yup.string().required("role must select"),
});
