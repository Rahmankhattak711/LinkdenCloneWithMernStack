import { connectDB } from "@/db/Connection";
import { Post } from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { content, image, video } = await req.json();

    if (!content) {
      return NextResponse.json(
        { success: false, message: "Content is required!" },
        { status: 400 }
      );
    }

    const newPost = new Post({ content, image, video });
    await newPost.save();

    return NextResponse.json(
      { success: true, message: "Post created successfully!", data: newPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Post creation failed! ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: posts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Failed to fetch posts! ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const id = req.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required!' },
        { status: 400 }
      );
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found!' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Post deleted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Post deletion failed! ${error}` },
      { status: 500 }
    );
  }
}
