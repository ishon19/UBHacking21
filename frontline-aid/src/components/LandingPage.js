import React from "react";
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
import image from "../assets/background-1.jpg";
import { v4 as uuidv4 } from 'uuid';

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

  return (
    <Box sx={{ padding: "10px" }}>
      <Grid container marginTop="2.5rem" justifyContent="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          color={theme.palette.secondary.heading}
        >
          FrontLine Aid
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
        {["Food", "Tranportation", "Utilities", "Reminders"].map((item) => {
          return (
            <Grid item key={uuidv4()}>
              <Card onClick={() => console.log("clicked")}>
                <CardMedia
                  component="img"
                  image={image}
                  height="250px"
                  maxWidth={500}
                />
                <CardContent>
                  <Typography variant="h6" color={theme.palette.primary.main}>
                    {item}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <Button color="primary" variant="contained" className={classes.root}>
            Go to home page
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
