import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", AuthController.loginUser);

export const AuthRoutes = authRouter;
