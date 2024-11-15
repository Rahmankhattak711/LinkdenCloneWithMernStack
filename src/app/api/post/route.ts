import { connectDB } from "@/db/Connection";
import Post from "@/models/PostModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  connectDB();

  try {
    const { content, image, video } = await req.json();
    if (!content) {
      return NextResponse.json({
        sucess: false,
        message: "Content is required!",
      });
    }

    const newPost = new Post({
      content,
      image,
      video,
    });

    await newPost.save();

    return NextResponse.json({
      sucess: true,
      message: "Post created successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: "Post creation failed!",
    });
  }
}

export async function GET(req: NextRequest) {
  connectDB();

  try {
    const posts = await Post.find();

    return NextResponse.json({
      sucess: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      sucess: false,
      message: "Post creation failed!",
    });
  }
}
