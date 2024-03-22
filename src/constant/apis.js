export const LOGIN_API = "/login/user_login";
export const FORGOTPASS_API = "/recoverpassword/user_forgotpassword";
export const RESETPASS_API = "/recoverpassword/user_resetpassword";
export const NEWSTATE_API = "/admin/dashboard/requests";
export const VIEWCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewcase";
export const VIEWNOTES_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewnotes";
export const CANCELCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewcancelcase";
export const REGION_API =
  "/admin/dashboard/requests/actions/transferrequestregions";

export const PHYSICIAN_API =
  "/admin/dashboard/requests/actions/transferrequestphysicians";

export const TRANSFERMODEL_API =
  "/admin/dashboard/requests/:confirmation_no/actions/transferrequest";

export const REQUESTCOUNT_API = "admin/dashboard/requestscount";

export const VIEWUPLOAD_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewuploads/viewdata";

export const VIEWUPDATE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewuploads/upload";
export const ASSIGNMODAL_API =
  "/admin/dashboard/requests/:confirmation_no/actions/assignrequest";

export const GETBLOACKCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewblockcase";
export const PUTBLOCKCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/blockcase";
