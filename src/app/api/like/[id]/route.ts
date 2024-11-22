import { connectDB } from "@/db/Connection";
import Like from "@/models/LikeModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const id = req.nextUrl.pathname.split('/').pop();

    if (!id) {
      console.error("Post ID is missing");
      return NextResponse.json(
        { success: false, message: "Post ID is required!" },
        { status: 400 }
      );
    }

    console.log("Post ID received:", id); 

    const existingLike = await Like.findOne({ post: id });
    if (existingLike) {
      console.log(`Like already exists for post with ID: ${id}`);
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
    console.log(`Like created for post with ID: ${id}`);

    return NextResponse.json(
      { success: true, message: "Like created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error1234" },
      { status: 500 }
    );
  }
}
