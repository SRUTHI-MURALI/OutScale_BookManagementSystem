import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  genre: {
    type: String,
  },
  image: {
    type: String,
  },
  authorName: {
    type: String
    
  },
  authorDetails:{
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  price:{
    type:Number,

  }
  
},
{
    timestamps: true,
}
);

bookSchema.index({ title: "text" });
bookSchema.index({ type: "text" });

export default model("books", bookSchema);
