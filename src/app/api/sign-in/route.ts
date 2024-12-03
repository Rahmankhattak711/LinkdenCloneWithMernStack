import { connectDB } from "@/db/Connection";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required!",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password!",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const, 
      maxAge: 24 * 60 * 60 * 1000, 
    };

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful!",
        token: token, 
      },
      { status: 200 }
    );

    response.cookies.set("session_token", token, cookieOptions);

    return response;

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal Server Error! ${error}`,
      },
      { status: 500 }
    );
  }
}
