import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

//Define Task Schema

const TaskSchema = new mongoose.Schema({
  Value: Number,
});

userSchema.plugin(mongooseUniqueValidator);

Schema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
