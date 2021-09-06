import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export default mongoose.model("tokens", TokenSchema);
