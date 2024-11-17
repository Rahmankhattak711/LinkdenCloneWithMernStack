import mongoose from "mongoose";

interface LikeInterface {
  like: boolean;
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const likeSchema = new mongoose.Schema<LikeInterface>(
  {
    like: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Add validation for required fields
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true, // Add validation for required fields
    },
  },
  { timestamps: true }
);

// Prevent model overwrite error in development environments
const Like =
  mongoose.models.Like || mongoose.model<LikeInterface>("Like", likeSchema);

export default Like;
