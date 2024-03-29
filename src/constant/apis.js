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

export const PUTCANCELCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/cancelcase";

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
export const CLEARCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/clearcase";
export const SENDAGREEMENT_API =
  "/admin/dashboard/requests/:confirmation_no/actions/sendagreement";

export const COMMON_API = "/commonroute/:confirmation_no/actions";

export const COMMONPROFESSION_API = "/commonroute/professions";

export const COMMONBUSINESS_API =
  "/admin/dashboard/requests/actions/sendorders/businesses";
export const GETSENDORDER_API =
  "/admin/dashboard/requests/actions/viewsendorders";
export const POSTSENDORDER_API =
  "/admin/dashboard/requests/:state/:confirmation_no/actions/sendorders";

export const GETCLOSECASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/closecase/viewdetails";
export const PUTCLOSECASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/closecase";
export const POSTCLOSECASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/closecase/edit";

export const SENDLINK_API = "/admin/dashboard/requests/sendlink";

export const REQUESTSUPPORT_API = "/admin/dashboard/requests/requestsupport";

export const GETMYPROFILE_API = "/admin/myprofile/admin_profile/view";

export const MYPROFILERESETPASS_API =
  "/admin/myprofile/admin_profile/resetpassword";

export const SINGLEDOWNLOAD_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewuploads/download/:document_id";

export const DOWNLOADALL_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewuploads/downloadall";
