import { connectDB } from "@/db/Connection";
import Like from "@/models/LikeModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const id = req.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const existingLike = await Like.findOne({ post: id });
    if (existingLike) {
      return NextResponse.json(
        { success: false, message: "Like already exists!" },
        { status: 409 }
      );
    }


    const newLike = new Like({
      like: true,
      post: id,
    });

    await newLike.save();

    return NextResponse.json(
      { success: true, message: "Like created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
