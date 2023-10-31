// import workout model
const Workout = require("../Model/Workout");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user;
    const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getbyId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(400).json({ message: "Can't find Id" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createWorkout = asyncHandler(async (req, res) => {
  // extract title,load,reps from request body.
  const { title, loads, reps } = req.body;
  if (!title || !loads || !reps) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }
  try {
    const user_id = req.user;
    const workout = await Workout.create({ title, loads, reps, user_id });
    // status 200  means "OK" or "successful"
    res.status(200).json({ workout, message: "Created succesfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: "Can't find Id" });
    }
    res.status(200).json({ message: "Deleted succesfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateWorkout = asyncHandler(async (req, res) => {
  const { title, loads, reps } = req.body;
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndUpdate(id, { title, loads, reps });
    if (!workout) {
      return res.status(404).json({ message: "Can't find Id" });
    }
    res.status(200).json({ message: "Updated succesfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAll,
  getbyId,
  deleteWorkout,
  updateWorkout,
  createWorkout,
};
