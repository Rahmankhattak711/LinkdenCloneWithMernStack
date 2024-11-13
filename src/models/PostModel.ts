import mongoose from "mongoose";

interface PostInterface extends Document {
  content: string;
  image: string;
  video: string;
}

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
});

const Post =
  (mongoose.models.PostInterface as mongoose.Model<PostInterface>) ||
  mongoose.model<PostInterface>("Post", postSchema);

export default Post;
