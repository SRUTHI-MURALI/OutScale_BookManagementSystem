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
  gender: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  photo: 
    {
      type: String,

    },
  tagged:[{
    type: Schema.Types.ObjectId,
    ref: "books",
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model("user", userSchema);
