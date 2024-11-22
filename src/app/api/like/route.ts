import { connectDB } from "@/db/Connection";
import Like from "@/models/LikeModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });
    if (existingLike) {
      return NextResponse.json(
        { success: false, message: "Like already exists!" },
        { status: 409 }
      );
    }

    console.log("Received data:", { postId, userId });


    const newLike = new Like({
      like: true,
      user: userId,
      post: postId,
    });

    await newLike.save();

    return NextResponse.json(
      { success: true, message: "Like created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling like request:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
