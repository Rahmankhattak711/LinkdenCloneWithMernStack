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
      required: true, 
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true, 
    },
  },
  { timestamps: true }
);

const Like =
  mongoose.models.Like || mongoose.model<LikeInterface>("Like", likeSchema);

export default Like;
