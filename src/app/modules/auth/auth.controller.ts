import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);

    if (result.data?.accessToken) {
      res.cookie("token", result.data?.accessToken);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loggedinUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;
    const isVerifiedUser = await jwt.verify(
      token,
      process.env.SECRET as Secret
    );
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User found",
      data: isVerifiedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  loginUser,
  loggedinUser,
};
