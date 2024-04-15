export const LOGIN_API = "/login/user_login";
export const FORGOTPASS_API = "/recoverpassword/user_forgotpassword";
export const RESETPASS_API = "/recoverpassword/user_resetpassword";
export const NEWSTATE_API = "/admin/dashboard/requests";
export const VIEWCASE_API =
  "/common/dashboard/requests/:confirmation_no/actions/viewcase";
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
  "/common/dashboard/requests/:confirmation_no/actions/viewuploads/viewdata";

export const VIEWUPDATE_API =
  "/common/dashboard/requests/:confirmation_no/actions/viewuploads/upload";
export const ASSIGNMODAL_API =
  "/admin/dashboard/requests/:confirmation_no/actions/assignrequest";

export const GETBLOACKCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/viewblockcase";
export const PUTBLOCKCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/blockcase";
export const CLEARCASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/clearcase";
export const SENDAGREEMENT_API =
  "/common/dashboard/requests/:confirmation_no/actions/sendagreement";

export const COMMON_API = "/commonroute/:confirmation_no/actions";

export const COMMONPROFESSION_API = "/commonroute/professions";

export const COMMONBUSINESS_API =
  "/common/dashboard/requests/actions/sendorders/businesses";
export const GETSENDORDER_API =
  "/common/dashboard/requests/actions/viewsendorders";
export const POSTSENDORDER_API =
  "/common/dashboard/requests/:state/:confirmation_no/actions/sendorders";

export const GETCLOSECASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/closecase/viewdetails";
export const PUTCLOSECASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/closecase";
export const POSTCLOSECASE_API =
  "/admin/dashboard/requests/:confirmation_no/actions/closecase/edit";

export const SENDLINK_API = "/admin/dashboard/requests/sendlink";

export const REQUESTSUPPORT_API = "/admin/dashboard/requests/requestsupport";
// ................................My Profile.........................................
export const GETMYPROFILE_API = "/admin/myprofile/admin_profile/view";

export const MYPROFILERESETPASS_API =
  "/admin/myprofile/admin_profile/resetpassword";
export const PUTMYPROFILE_API =
  "/admin/myprofile/admin_profile/editadminbillinginfo";

export const SINGLEDOWNLOAD_API =
  "/common/dashboard/requests/:confirmation_no/actions/viewuploads/download/:document_id";

export const DOWNLOADALL_API =
  "/common/dashboard/requests/:confirmation_no/actions/viewuploads/downloadall";

export const SINGLEDELETE_API =
  "/common/dashboard/requests/:confirmation_no/actions/viewuploads/delete/:document_id";

export const DELETEALL_API =
  "/common/dashboard/requests/:confirmation_no/actions/viewuploads/deleteall";

export const CREATEREQUEST_API = "/admin/dashboard/requests/createrequest";

export const CREATEREQUESTVERIFY_API =
  "/admin/dashboard/requests/createrequestverify";
// ...........................ACCOUNT Accesss.....................................................
export const GETACCOUNTACCESS_API = "/admin/access/accountaccess";
export const GETACCOUNTACCESSEDIT_API =
  "/admin/access/accountaccess/:role_id/edit";
export const DELETEACCOUNTACCESS_API =
  "/admin/access/accountaccess/:role_id/delete";
export const PUTACCOUNTACCESS_API =
  "/admin/access/accountaccess/:role_id/save_edit";
export const POSTACCOUNTACCESS_API =
  "/admin/access/accountaccess/create_access";
// ....................................User Access.............................................
export const GETUSERACCESS_API = "/admin/access/useraccess";
export const GETACCESSLIST_API = "/commonroute/accesses";

export const SINGLEEXPORT_API = "/commonroute/export_single";

export const EXPORTALL_API = "/commonroute/export_all";

// .................................Provider Api...............................................
export const GETPROVIDERINFORMATION_API = "/admin/providermenu/provider_list";

export const POSTCONTACTPROVIDER_API =
  "/admin/providermenu/provider_list/:user_id/contact_provider";

export const GETPROVIDERPHYSICIANDATA_API =
  "/admin/providermenu/provider_list/:user_id/view_edit_physician_account";
export const PUTRESETPROVIDERPASSWORD_API =
  "/admin/providermenu/provider_list/physician_account_reset_password";
export const PROVIDEREDIT_API =
  "/admin/providermenu/provider_list/save_user_information";

export const DELETEPROVIDER_API =
  "/admin/providermenu/provider_list/:user_id/delete_provider_account";
export const POSTCREATEPROVIDER_API =
  "/admin/providermenu/provider_list/create_provider_account";
// ..........................................Scheduling Api..............................................
export const POSTCREATESHIFT_API = "/admin/scheduling_menu/create_shift";
export const GETPROVIDERONCALL_API =
  "/admin/scheduling_menu/providers_on_call_list";
export const GETREQUESTSHIFT_API = "/admin/scheduling_menu/requested_shifts";
export const PUTAPPROVEDSHIFT_API =
  "/admin/scheduling_menu/requested_shifts/approve_selected";
export const DELETESELECTEDSHIFT_API =
  "/admin/scheduling_menu/requested_shifts/delete_selected";
export const GETPROVIDERSHIFTA_API =
  "/admin/scheduling_menu/provider_shifts_lists";
export const GETVIEWSHIFT =
  "/admin/scheduling_menu/provider_shifts_lists/view_shift";
export const PUTRETURNSHIFT =
  "/admin/scheduling_menu/provider_shifts_lists/:shift_id/edit_shift_return";
// .........................................Record Api......................................../

export const GETPATIENTHISTORY_API = "/admin/records/patienthistory";
export const GETPATIENRECORDS_API = "/admin/records/patient_records";
export const GETSEARCHRECORD_API = "/admin/records/search_records";
export const DELETESEARCHRECORD_API =
  "/admin/records/:confirmation_no/search_records_delete";
export const GETBLOCKHISTORY_API = "/admin/records/cancel_block_history";
export const PUTUNBLOCKHISTORY_API =
  "/admin/records/:confirmation_no/block_history_unblock";
export const GETLOGS = "/admin/records/logs";
export const PUTEDITSHIFT =
  "/admin/scheduling_menu/provider_shifts_lists/edit_shift";

// .......................................Partners Api.................................

export const GETPARTNERSLIST_API = "/admin/partners/partners_vendorslist";
export const POSTADDBUSSINESS_API = "/admin/partners/add_business";
export const DELETEPARTNER_API = "/admin/partners/:business_id/delete_vendor";
export const GETBUSINESSVIEW_API =
  "/admin/partners/:business_id/update_business_view";
export const PUTBUSINESSUPDATE_API =
  "/admin/partners/:business_id/update_business";

// ..........................................Physician Site .....................................
export const GETPROVIDERREQUESTBYSTATE_API = "/provider/dashboard/requests";
