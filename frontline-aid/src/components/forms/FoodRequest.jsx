import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import theme from "../../theme";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string("Enter your email")
    .min(1, "Enter atleast one character")
    .required("Item name is required"),
  description: yup
    .string("Enter description")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const FoodRequestForm = () => {
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log("Test");
      console.log(JSON.stringify(values, null, 2));
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
          Request Food
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt="1rem" mb="1rem" padding="2rem">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
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

export default FoodRequestForm;
