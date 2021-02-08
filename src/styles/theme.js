import { amber, blue, indigo } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: amber,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    divider: "#E1E1E1",
    background: {
      default: "#F6F6F7",
      paper: "#FFFFFF",
      tableHeader: "#F2F1F5",
    },
    borders: {
      grey: "#EAEAEA",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    h6: {
      lineHeight: 1.1,
    },
  },
  spacing: 0.5,
});

theme = responsiveFontSizes(theme);
console.log("theme = ", theme);

export default theme;
