import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import theme from "../../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getUserId } from "../../utils/common-utils";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../server/Firebase";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
  name: yup
    .string("Enter the food item")
    .min(1, "Enter at least one character")
    .required("Food name is required"),
  address: yup
    .string("Enter Address")
    .min(8, "Address should be atleast of 8 characters")
    .required("Address is required"),
});

const FoodRequestForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const _setDocs = async (values) => {
    const userId = await getUserId();
    console.log("User ID: ", userId, " and values: ", values);
    if (userId) {
      await setDoc(doc(db, "serviceRequests", uuidv4()), {
        ...values,
        userId,
        resolved: false,
        type: "food",
      });
      
      enqueueSnackbar("Food request submitted successfully", {
        variant: "success",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      address: "",
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
          Request Food
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt="1rem" mb="1rem" padding="2rem">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="label">Select</InputLabel>
                  <Select
                    name="name"
                    id="name"
                    label="Food Item"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  >
                    <MenuItem value="burgers">Burgers</MenuItem>
                    <MenuItem value="subs">Subs</MenuItem>
                    <MenuItem value="pasta">Pasta</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
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
