import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React from "react";

import "./App.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import theme from "./theme";
import FoodRequestForm from "./components/forms/FoodRequest";
import { SnackbarProvider } from "notistack";
import CabRequestForm from "./components/forms/CabRequest";
import { checkIfUserLoggedIn } from "./utils/common-utils";
import RequestTracker from "./components/RequestTracker";

function App() {
  const loggedIn = checkIfUserLoggedIn();
  console.log("loggedIn", loggedIn);

  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Router>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route
                exact
                path="/request-food"
                element={loggedIn && <FoodRequestForm />}
              />
              <Route
                exact
                path="/request-utilities"
                element={loggedIn && <FoodRequestForm />}
              />
              <Route
                exact
                path="/request-cabs"
                element={loggedIn && <CabRequestForm />}
              />
              <Route
                exact
                path="/request-reminders"
                element={loggedIn && <CabRequestForm />}
              />
              <Route
                exact
                path="/view-status"
                element={loggedIn && <RequestTracker />}
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
