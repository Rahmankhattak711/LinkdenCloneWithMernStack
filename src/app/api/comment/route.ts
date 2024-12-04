import { connectDB } from "@/db/Connection"; 
import Comment from "@/models/Comment";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { comment, userId, postId } = await req.json();

    if (!comment ) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const newComment = new Comment({ comment, user: userId, post: postId });

    await newComment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Comment created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Comment creation failed! ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const comments = await Comment.find()
    .populate("user", "name email userImage jobTitle")
    .populate("posts", "content image video") 
    .exec();

  
  console.log(comments);
  
    

    return NextResponse.json(
      { success: true, message: "Get comments successfully!"},
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching comments:", error);
    return NextResponse.json({
      success: false,
      message: "Get comments failed!",
    });
  }
}

