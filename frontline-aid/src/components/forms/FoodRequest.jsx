import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const FoodRequestForm = () => {
  const [foodRequest, setFoodRequest] = useState({
    name: "",
    description: "",
    quantity: "",
    location: "",
    image: "",
    category: "",
    status: "",
    date: "",
    time: "",
    user: "",
  });

  const handleChange = (e) => {
    setFoodRequest({
      ...foodRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(foodRequest);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
        <div>
         <TextField required name="name" label="Name"/>
        </div>
    </Box>
  );
};

export default FoodRequestForm;