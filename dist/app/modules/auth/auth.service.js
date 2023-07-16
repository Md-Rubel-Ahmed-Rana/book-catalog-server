"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email });
    let result = {};
    if (!isUserExist) {
        return (result = {
            statusCode: 404,
            success: false,
            message: "User not found!",
            data: null,
        });
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
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
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, {
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
});
exports.AuthService = {
    loginUser,
};
