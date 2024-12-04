import mongoose from "mongoose";

interface UserTypes extends Document {
  name: string;
  email: string;
  password: string;
  userImage: string;
  jobTitle: string;
  posts: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<UserTypes>) ||
  mongoose.model<UserTypes>("User", userSchema);

export { User };
