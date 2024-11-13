import { connectDB } from "@/db/Connection";
import User from "@/models/UserModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  connectDB();

  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({
        sucess: false,
        message: "All fields are required!",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        sucess: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({
      sucess: true,
      message: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      sucess: false,
      message: "User creation failed!",
    });
  }
}
