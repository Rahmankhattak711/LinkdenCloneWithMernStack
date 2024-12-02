// import mongoose, { Schema } from "mongoose";

// interface PostInterface {
//   content: string;
//   image?: string;
//   video?: string;
//   user: mongoose.Schema.Types.ObjectId;
//   comments: mongoose.Schema.Types.ObjectId[];
// }

// const postSchema: Schema<PostInterface> = new mongoose.Schema(
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: false,
//     },
//     video: {
//       type: String,
//       required: false,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Post =
//   mongoose.models.Post || mongoose.model<PostInterface>("Post", postSchema);

// export default Post;
