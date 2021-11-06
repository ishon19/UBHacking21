import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#98D7C2",
    },
    secondary: {
      main: "#DDFFE7",
      heading: "#29A0B1",
      text: "#FAFAFA",
    },
  },
  typography: {
    fontFamily: "'Source Sans Pro'",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
