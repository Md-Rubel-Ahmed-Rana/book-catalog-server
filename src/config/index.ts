import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database connected successfully!");
  } catch (error: any) {
    console.log({
      message: "Database not connected",
      error: error.message,
    });
  }
};
export default databaseConnection;
