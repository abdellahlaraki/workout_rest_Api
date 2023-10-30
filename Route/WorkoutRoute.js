// import express module
const express = require("express");
const requireAuth=require("../Middleware/requireAuth");
//
const {
  createWorkout,
  getAll,
  deleteWorkout,
  getbyId,
  updateWorkout,
} = require("../Controller/WorkoutController");

const router = express.Router();
router.use(requireAuth);
// create workout
router.post("/", createWorkout);

//
router.get("/", getAll);
// get by id
router.get("/:id", getbyId);

router.delete("/:id", deleteWorkout);

router.put("/:id", updateWorkout);
module.exports = router;
