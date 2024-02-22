import { createTheme } from "@mui/material";

// const primary = "#59B997";
// const primaryContrast = "#F6F6F6";
// const secondary = "#4B4B4B";
// const secondaryMain = "#424242";
// const secondaryLight = "#9C9C9C";
// const secondaryContrast = "#6D6D6D";
// const grey = "#E9E9E9";
// const greyLight = "#FAFAFA";
// const greyDark = "#A5A5A5";
// const white = "#FFFFFF";
// const whiteLight = "#EAEAEA";
// const black = "#000000";
// const blue = "#E6F4FF";
// const purple = "#F6EFFF";
// const peach = "#FFF0E9";
// const orange = "#FFE4E4";
// const danger = "#FFFAFA";
// const primaryHover = "#59b9972e";
// const primaryHoverDark = "#338e6fe6";
// const primaryLight = "#3EAE86";

export const halloDocTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          height: "3rem",
        },
        body: {
          height: "3rem",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&.search-text .MuiInputBase-root": {
            height: "2.5rem",
          },
          "&.drop-list .MuiInputBase-root": {
            width: "15rem",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.phonebtn": {
            minWidth: "45px",
            padding: "7px 12px",
            height: "100%",
          },
          "&.editbtn": {
            minWidth: "45px",
            height: "100%",
          },
          "&.locationbtn": {
            height: "100%",
            minWidth: "45px",
          },
          "&.viewbtn, &.backbtn": {
            backgroundColor: "#39B3C3",
          },
          "&.hover": {
            backgroundColor: "#39B3C3",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          minWidth: "250px",
        },
        root: {
          "&.sidebar .MuiDrawer-paper": {
            backgroundColor: "#d1e7df",
          },
        },
      },
    },
  },
});
