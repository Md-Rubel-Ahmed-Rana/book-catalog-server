import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { BookRoutes } from "./app/modules/books/book.route";
import { ReadingRoutes } from "./app/modules/readingList/reading.route";
import { UserRoutes } from "./app/modules/users/user.route";
import { WishListRoutes } from "./app/modules/wishList/wishList.route";
import databaseConnection from "./config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

databaseConnection();

// root route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Server is working fine!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

// application routes

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/wishlist", WishListRoutes);
app.use("/api/v1/readinglist", ReadingRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(404).json({
      statusCode: 404,
      success: false,
      message: `Your route '${req.originalUrl}' is not found`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: `Your route '${req.originalUrl}' is not found`,
    data: {
      error: error?.message,
    },
  });
});

export default app;
