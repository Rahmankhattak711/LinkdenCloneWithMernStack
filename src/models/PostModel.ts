import mongoose, { Document, Model, Schema } from "mongoose";

interface PostInterface extends Document {
  content: string;
  image?: string;
  video?: string;
  user: mongoose.Schema.Types.ObjectId; 
}

const postSchema: Schema<PostInterface> = new mongoose.Schema(
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
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Post: Model<PostInterface> =
  mongoose.models.Post || mongoose.model<PostInterface>("Post", postSchema);

export default Post;
