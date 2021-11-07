import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../theme";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchCategories, fetchAppName } from "../services/LandingPageService";
import { Link } from "react-router-dom";
import { checkIfUserLoggedIn, getRouteFromName } from "../utils/common-utils";

const styles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.text,
    height: "5vh",
    width: "15vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const LandingPage = () => {
  const classes = styles();
  const [categories, setCategories] = React.useState([]);
  const [appName, setAppName] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = await checkIfUserLoggedIn();
      setIsLoggedIn(isLoggedIn);
    };
    checkLoggedIn();
  });

  useEffect(() => {
    const fetchCat = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    const fetchName = async () => {
      const appName = await fetchAppName();
      setAppName(appName);
    };

    fetchCat();
    fetchName();
  }, []);

  return (
    <Box sx={{ padding: "10px" }}>
      <Grid container marginTop="2.5rem" justifyContent="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          color={theme.palette.secondary.heading}
        >
          {appName}
        </Typography>
      </Grid>
      <Grid container marginTop="2.5rem" justifyContent="center">
        <Typography variant="h5" color={theme.palette.primary.main}>
          What do you need help with?
        </Typography>
      </Grid>
      <Grid
        container
        padding="5.0rem"
        marginTop="1.5rem"
        direction="row"
        spacing={1}
        justifyContent="space-around"
      >
        {categories.length > 0 ? (
          categories.map((item) => {
            return (
              <Grid item key={uuidv4()}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={getRouteFromName(item.name)}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      height="250px"
                      width="300px"
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color={theme.palette.primary.main}
                      >
                        {item.displayName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
      {isLoggedIn && (
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              className={classes.root}
            >
              <Link to="/view-status" style={{ textDecoration: "none" }}>
                View my requests
              </Link>
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LandingPage;
