import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import "./App.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import theme from "./theme";

function App() {
  const loggedIn = false;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {!loggedIn ? <LandingPage /> : <></>}
    </ThemeProvider>
  );
}

export default App;
