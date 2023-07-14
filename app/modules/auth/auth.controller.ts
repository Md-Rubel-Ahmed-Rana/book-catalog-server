import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);

    if (result.data?.accessToken) {
      res.cookie("token", result.data?.accessToken);
    }
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  loginUser,
};
