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

interface PostInterface {
  content: string;
  image?: string;
  video?: string;
  user: mongoose.Schema.Types.ObjectId;
  comments: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

interface CommentInterface {
  comment: string;
  user: mongoose.Types.ObjectId;
  posts: mongoose.Types.ObjectId;
}

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<UserTypes>) ||
  mongoose.model<UserTypes>("User", userSchema);

const Post =
  mongoose.models.Post || mongoose.model<PostInterface>("Post", postSchema);

const Comment =
  mongoose.models.Comment ||
  mongoose.model<CommentInterface>("Comment", commentSchema);

export { User, Post, Comment };
