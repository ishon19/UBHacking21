import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import theme from "./theme";
import FoodRequestForm from "./components/forms/FoodRequest";
import { SnackbarProvider } from "notistack";
import CabRequestForm from "./components/forms/CabRequest";

function App() {
  const loggedIn = false;
  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Router>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/request-food" element={<FoodRequestForm />} />
              <Route
                exact
                path="/request-utilities"
                element={<FoodRequestForm />}
              />
              <Route exact path="/request-cabs" element={<FoodRequestForm />} />
              <Route
                exact
                path="/request-reminders"
                element={<FoodRequestForm />}
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/request-food" element={<FoodRequestForm />} />
            <Route exact path="/request-utilities" element={<FoodRequestForm />} />
            <Route exact path="/request-cabs" element={<CabRequestForm />} />
            <Route exact path="/request-reminders" element={<FoodRequestForm />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
