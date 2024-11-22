import mongoose, { Document, Model, Schema } from "mongoose";

interface PostInterface extends Document {
  content: string;
  image?: string;
  video?: string;
  user: mongoose.Schema.Types.ObjectId; 
  tags?: string[];
}

const postSchema: Schema<PostInterface> = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 10,  
      maxlength: 1000, 
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
      required: true,
    },
    tags: {
      type: [String], 
      required: false,
    },
  },
  { timestamps: true }
);

const Post: Model<PostInterface> =
  mongoose.models.Post || mongoose.model<PostInterface>("Post", postSchema);

export default Post;
