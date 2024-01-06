import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tagged:[{
    type: Schema.Types.ObjectId,
    ref: "books",
  }]
});

export default model("user", userSchema);
