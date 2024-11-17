import { connectDB } from "@/db/Connection";
import Like from "@/models/LikeModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { postId, userId } = await req.json();

    const id = postId._id;

    const existingLike = await Like.findOne({ post: id, user: userId });

    if (existingLike) {
      return NextResponse.json({
        success: false,
        message: "Like already exists!",
      });
    }

    const newLike = new Like({
      like: true,
      user: userId,
      post: postId,
    });

    await newLike.save();

    return NextResponse.json({
      success: true,
      message: "Like created successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}
