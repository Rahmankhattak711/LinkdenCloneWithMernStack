import mongoose, { Document, Model, Schema } from "mongoose";

interface PostInterface extends Document {
  content: string;
  image?: string; 
  video?: string; 
}

const postSchema: Schema<PostInterface> = new mongoose.Schema({
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
});

const Post: Model<PostInterface> =
  mongoose.models.Post || mongoose.model<PostInterface>("Post", postSchema);

export default Post;
