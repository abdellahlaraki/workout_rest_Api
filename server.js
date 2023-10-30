// import dotenv to  loads environment variables from a .env file into process.env
require("dotenv").config();
const cors=require("cors");
// import mongoose
const mongoose = require("mongoose");
// import express
const express = require("express");
// create an express app
const app = express();
// import user
const userouter = require("./Route/UserRoute");
// import workoutrouter
const workoutrouter = require("./Route/WorkoutRoute");

app.use(cors());
app.use(express.json());
app.use("/api/workout", workoutrouter);
app.use("/api", userouter);
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    // starts the Express server and has it listen for incoming requests on port 3000.
    app.listen(port, () => {
      console.log("listening to port  3000");
    });
    console.log("Connected!");
  })
  .catch((error) => {
    console.log(error.message);
  });
