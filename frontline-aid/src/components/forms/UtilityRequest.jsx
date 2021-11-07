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
    .string("Select the utility item")
    .min(1, "Enter at least one character")
    .required("This field is required"),
  amount: yup
    .string("Enter Amount")
    .min(1, "Address should be atleast of 1 characters")
    .required("Amount is required"),
});

const UtilityRequestForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const _setDocs = async (values) => {
    const userId = await getUserId();
    console.log("User ID: ", userId, " and values: ", values);
    if (userId) {
      await setDoc(doc(db, "serviceRequests", uuidv4()), {
        ...values,
        userId,
        resolved: false,
        type: "utility",
      });

      enqueueSnackbar("Utility request submitted successfully", {
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
      utility: "",
      amount: 0,
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
          Request Daily Utility
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt="1rem" mb="1rem" padding="2rem">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="label">Select</InputLabel>
                  <Select
                    name="utility"
                    id="utility"
                    label="Utility Items"
                    value={formik.values.utility}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.utility && Boolean(formik.errors.utility)
                    }
                    helperText={formik.touched.utility && formik.errors.utility}
                  >
                    <MenuItem value="burgers">Mask</MenuItem>
                    <MenuItem value="subs">Sanitizer</MenuItem>
                    <MenuItem value="pasta">PPE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="amount"
                  name="amount"
                  label="Amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
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

export default UtilityRequestForm;
