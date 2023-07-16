import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../users/user.model";

const loginUser = async (email: string, password: string) => {
  const isUserExist = await User.findOne({ email });
  let result = {};
  if (!isUserExist) {
    return (result = {
      statusCode: 404,
      success: false,
      message: "User not found!",
      data: null,
    });
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password as string
  );
  if (!isPasswordMatched) {
    return (result = {
      statusCode: 400,
      success: false,
      message: "Password not matched!",
      data: null,
    });
  }

  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    name: isUserExist.name,
  };
  const token = jwt.sign(jwtPayload, process.env.SECRET as Secret, {
    expiresIn: "1d",
  });

  return (result = {
    statusCode: 200,
    success: true,
    message: "User logged in successfully!",
    data: {
      accessToken: token,
      user: {
        name: isUserExist.name,
        email: isUserExist.email,
        id: isUserExist._id,
      },
    },
  });
};

export const AuthService = {
  loginUser,
};
