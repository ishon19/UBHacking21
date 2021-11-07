import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../server/Firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useSnackbar } from "notistack";
import { checkIfUserLoggedIn } from "../utils/common-utils";

const Header = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const _setDocs = async () =>
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const auth = await checkIfUserLoggedIn();
      setLoggedIn(auth);
    };
    checkLoggedIn();
  }, [loggedIn]);

  const handleAuth = () => {
    console.log("Login button clicked");
    if (!loggedIn) {
      const provider = new GoogleAuthProvider();
      const auth = new getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Logged in");
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user.displayName;
          console.log("User Info: ", user, " token: ", token);
          enqueueSnackbar(`Welcome, ${user}`, {
            variant: "success",
            autoHideDuration: 5000,
          });
          setLoggedIn(true);
          localStorage.setItem("userInfo", JSON.stringify(result.user));
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      console.log("Logging out");
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Logged out");
          setLoggedIn(false);
          enqueueSnackbar("Logged out!", {
            variant: "success",
            autoHideDuration: 5000,
          });
          localStorage.removeItem("userInfo");
          window.location.href = "/";
        })
        .catch((error) => {
          // An error happened.
          console.log("Signout Error: ", error);
          enqueueSnackbar("Something went wrong, please try again!", {
            variant: "warning",
            autoHideDuration: 5000,
          });
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} justifyContent="space-between">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: "whitesmoke" }} />
          </IconButton>
          <Typography variant="h5" sx={{ color: "whitesmoke" }}>
            Frontline Aid
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{ color: "white" }}>
            <Typography variant="h6" onClick={handleAuth}>
              {loggedIn ? "Logout" : "Login"}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
