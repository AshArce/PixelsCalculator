import mongoose from "mongoose";

export default function connectToDB(url) {
  mongoose.connect(url).then((_res) => console.log("Connected to Database"));
}
