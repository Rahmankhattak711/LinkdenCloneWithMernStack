import { connectDB } from '@/db/Connection';
import Post from '@/models/PostModel';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  await connectDB(); 

  try {
    const id = req.url.split('/').pop(); 

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
      { success: false, message: 'Post deletion failed!'},
      { status: 500 }
    );
  }
}
