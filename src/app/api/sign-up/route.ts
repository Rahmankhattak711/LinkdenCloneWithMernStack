import { connectDB } from "@/db/Connection";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { name, email, password, userImage, jobTitle, verified } =
      await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userImage,
      jobTitle,
      verified,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    setCookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { success: true, message: "User created successfully!" , token: token},
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const users = await User.find()
      .populate("posts", "content image video")
      .populate("comments", "comment")
      .exec();

    if (!users.length) {
      return NextResponse.json(
        { success: false, message: "No users found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Users fetched successfully!", data: users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
