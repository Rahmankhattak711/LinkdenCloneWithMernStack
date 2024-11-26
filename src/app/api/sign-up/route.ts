import { connectDB } from "@/db/Connection";
import User from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  connectDB();

  try {
    const {
      name,
      email,
      password,
      userImage,
      jobTitle,
      posts,
      comments,
      verified,
    } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required!",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userImage,
      jobTitle,
      posts,
      comments,
      verified,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created successfully!",
      userId: newUser._id,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}

export async function GET() {
  connectDB();
  try {
    const users = await User.find();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log("Error fetching users:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}
