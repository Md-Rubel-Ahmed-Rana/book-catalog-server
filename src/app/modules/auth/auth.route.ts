import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", AuthController.loginUser);
authRouter.get("/loggedinUser", AuthController.loggedinUser);

export const AuthRoutes = authRouter;
