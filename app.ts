import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { UserRoutes } from "./app/modules/users/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

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
