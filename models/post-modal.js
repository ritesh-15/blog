import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      required: true,
    },
    likes: {
      type: String,
      default: 0,
    },
    catagory: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", PostSchema);
