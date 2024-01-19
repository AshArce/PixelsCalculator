import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  landNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value.toString().length <= 4;
      },
      message: (props) =>
        `${props.value} exceeds the maximum of 4 characters for landNumber!`,
    },
  },
  landDescription: {
    type: String,
    maxlength: 50,
  },
  landType: {
    type: String,
    required: true,
  },
  landIndustries: {
    type: String,
    maxlength: 25,
    required: true,
  },
});

landSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Land = mongoose.model("Land", landSchema);

export default Land;
