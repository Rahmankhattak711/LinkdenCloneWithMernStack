import { connectDB } from "@/db/Connection";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  connectDB();

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

    const user = await User.findOne({ email, password });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password!",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successfully!",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error logging in:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error!",
      },
      { status: 500 }
    );
  }
}
