import { connectDB } from "@/db/Connection";
import Comment from "@/models/CommentModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { comment, postId } = await req.json();

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const newComment = new Comment({ comment });
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
