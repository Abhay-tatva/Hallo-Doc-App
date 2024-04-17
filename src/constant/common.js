import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DiamondIcon from "@mui/icons-material/Diamond";
export const newColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    accountTypes: ["admin", "physician"],
  },
  { id: "mail", label: "", minWidth: 50, accountTypes: ["admin", "physician"] },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    minWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "requestor",
    label: "Requestor",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "requestedDate",
    label: "Requested Date",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 130,
    align: "right",
    accountTypes: ["admin"],
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
];
export const pendingColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    accountTypes: ["admin", "physician"],
  },
  { id: "mail", label: "", minWidth: 50, accountTypes: ["admin", "physician"] },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    minWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "requestor",
    label: "Requestor",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "physicanName",
    label: "Physican Name",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin"],
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
];
export const activeColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    accountTypes: ["admin", "physician"],
  },
  { id: "mail", label: "", minWidth: 50, accountTypes: ["admin", "physician"] },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    minWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "requestor",
    label: "Requestor",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "physicanName",
    label: "Physican Name",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "status",
    label: "Status",
    minWidth: 200,
    align: "right",
    accountTypes: ["physician"],
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 130,
    align: "right",
    accountTypes: ["admin"],
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
];
export const concludeColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    accountTypes: ["admin", "physician"],
  },
  { id: "mail", label: "", minWidth: 50, accountTypes: ["admin", "physician"] },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    minWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "physicanName",
    label: "Physican Name",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin", "physician"],
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
    accountTypes: ["admin", "physician"],
  },
];
export const toCloseColumns = [
  { id: "name", label: "Name", minWidth: 200, accountTypes: ["admin"] },
  { id: "mail", label: "", minWidth: 50, accountTypes: ["admin"] },
  {
    id: "dateOfBirth",
    label: "Date Of Birth",
    minWidth: 100,
    accountTypes: ["admin"],
  },

  {
    id: "region",
    label: "Region",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "physicanName",
    label: "Physican Name",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },

  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 130,
    align: "right",
    accountTypes: ["admin"],
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
    accountTypes: ["admin"],
  },
];
export const unpaidColumns = [
  { id: "name", label: "Name", minWidth: 200, accountTypes: ["admin"] },
  { id: "mail", label: "", minWidth: 50, accountTypes: ["admin"] },
  {
    id: "physicanName",
    label: "Physican Name",
    align: "right",
    maxWidth: 100,
    accountTypes: ["admin"],
  },
  {
    id: "dateOfService",
    label: "Date of Service",
    maxWidth: 95,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "phoneNumber",
    label: "Phone",
    maxWidth: 175,
    align: "right",
    accountTypes: ["admin"],
  },
  {
    id: "address",
    label: "Address",
    minWidth: 250,
    align: "right",
    accountTypes: ["admin"],
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    align: "right",
    accountTypes: ["admin"],
  },
];

export const newDropdown = [
  {
    id: "1",
    name: "Assign Case",
    icon: <AssignmentOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "2",
    name: "Cancel Case",
    icon: <HighlightOffOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "3",
    name: "Accept",
    icon: <FormatListBulletedIcon />,
    accountTypes: ["physician"],
  },
  {
    id: "4",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "5",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "6",
    name: "Block Patient",
    icon: <BlockOutlinedIcon />,
    accountTypes: ["admin"],
  },
];
export const pendingDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <DriveFolderUploadOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "4",
    name: "Transfer",
    icon: <FormatListNumberedOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "5",
    name: "Clear Case",
    icon: <HighlightOffOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "6",
    name: "Send Agreement",
    icon: <IosShareOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
];
export const activeDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <DriveFolderUploadOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "4",
    name: "Orders",
    icon: <FindInPageOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "5",
    name: "Doctors Notes",
    icon: <LocalHospitalOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "6",
    name: "Encounter",
    icon: <LocalDiningOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
];
export const concludeDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "2",
    name: "Conclude Care",
    icon: <DiamondIcon />,
    accountTypes: ["physician"],
  },
  {
    id: "3",
    name: "View Upload",
    icon: <DriveFolderUploadOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "4",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["admin", "physician"],
  },
  {
    id: "5",
    name: "Orders",
    icon: <FindInPageOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "6",
    name: "Doctors Notes",
    icon: <LocalHospitalOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "7",
    name: "Encounter",
    icon: <LocalDiningOutlinedIcon />,
    accountTypes: ["admin"],
  },
];
export const toCloseDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <DriveFolderUploadOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "4",
    name: "Orders",
    icon: <FindInPageOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "5",
    name: "Close Case",
    icon: <HighlightOffOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "6",
    name: "Doctors Notes",
    icon: <LocalHospitalOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "7",
    name: "Clear Case",
    icon: <HighlightOffOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "8",
    name: "Encounter",
    icon: <LocalDiningOutlinedIcon />,
    accountTypes: ["admin"],
  },
];
export const unpaidDropdown = [
  {
    id: "1",
    name: "View Case",
    icon: <PageviewOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "2",
    name: "View Upload",
    icon: <DriveFolderUploadOutlinedIcon />,
    accountTypes: ["admin"],
  },
  {
    id: "3",
    name: "View Notes",
    icon: <DocumentScannerOutlinedIcon />,
    accountTypes: ["admin"],
  },
];

export const indicator = [
  { name: "Patient", color: "green" },
  { name: "Family/Friend", color: "orange" },
  { name: "Business", color: "Pink" },
  { name: "Concierge", color: "blue" },
];
