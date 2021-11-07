import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import theme from "../../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserId } from "../../utils/common-utils";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../server/Firebase";

const validationSchema = yup.object({
  pickup: yup
    .string("Enter your location")
    .min(1, "Enter at least one character")
    .required("Pickup location is required."),
  destination: yup
    .string("Where do you want to go?")
    .min(1, "This field cannot be left blank.")
    .required("This field is required"),
});

const CabRequestForm = () => {
  const _setDocs = async (values) => {
    const userId = await getUserId();
    console.log("User ID: ", userId, " and values: ", values);
    if (userId) {
      await setDoc(doc(db, "serviceRequests", "cabRequests"), {
        ...values,
        userId,
        resolved: false,
      });
    }
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      pickup: "",
      destination: "",
    },
    onSubmit: (values) => {
      // push the data to the database
      console.log(JSON.stringify(values, null, 2));
      _setDocs(values);
    },
  });

  return (
    <Grid
      container
      direction="column"
      sx={{
        marginTop: "2rem",
        padding: `2rem 20rem 0rem 20rem`,
      }}
    >
      <Card
        sx={{
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography variant="h5" color={theme.palette.primary.main}>
          Request Cab
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt="1rem" mb="1rem" padding="2rem">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  name="destination"
                  id="destination"
                  label="Destination"
                  value={formik.values.destination}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.destination &&
                    Boolean(formik.errors.destination)
                  }
                  helperText={
                    formik.touched.destination && formik.errors.destination
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="pickup"
                  name="pickup"
                  label="Pick up location"
                  value={formik.values.pickup}
                  onChange={formik.handleChange}
                  error={formik.touched.pickup && Boolean(formik.errors.pickup)}
                  helperText={formik.touched.pickup && formik.errors.pickup}
                />
              </Grid>
              <Grid item>
                <Button fullWidth variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Card>
    </Grid>
  );
};

export default CabRequestForm;
