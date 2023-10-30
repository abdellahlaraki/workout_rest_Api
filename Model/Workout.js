const mongoose = require("mongoose");

// A schema represents the structure of a document within a collection of MongoDB
const workoutshcema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    loads: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    user_id:{
      type:String,
      required:true
    }
  },
  {
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema: (createdAt,updatedAt)
    timestamps: true,
  }
);

module.exports=mongoose.model("Workout",workoutshcema);
// This creates and exports a Mongoose model using the schema defined above