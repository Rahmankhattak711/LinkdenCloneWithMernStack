// import mongoose from "mongoose";

// interface CommentInterface {
//   comment: string;
//   user: mongoose.Types.ObjectId;
//   post: mongoose.Types.ObjectId;
// }

// const commentSchema = new mongoose.Schema(
//   {
//     comment: {
//       type: String,
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     post: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Post",
//     },
//   },
//   { timestamps: true }
// );

// const Comment =
//   mongoose.models.Comment ||
//   mongoose.model<CommentInterface>("Comment", commentSchema);

// export default Comment;
