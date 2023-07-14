import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/create-user", UserController.createUser);
userRouter.get("/:id", UserController.getUser);

export const UserRoutes = userRouter;
