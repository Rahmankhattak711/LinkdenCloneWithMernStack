import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGO_URI!);
    const db = dbConnect.connection;

    db.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    return Response.json({
      sucess: true,
      message: "Mongo db connection Success!",
    });
  } catch (error) {
    return Response.json({
      sucess: false,
      message: `Mongo db connection Error! ${error}`,
    });
  }
};
