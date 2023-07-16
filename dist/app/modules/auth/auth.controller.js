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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("./auth.service");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email, password } = req.body;
        const result = yield auth_service_1.AuthService.loginUser(email, password);
        if ((_a = result.data) === null || _a === void 0 ? void 0 : _a.accessToken) {
            res.cookie("token", (_b = result.data) === null || _b === void 0 ? void 0 : _b.accessToken);
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const loggedinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const isVerifiedUser = yield jsonwebtoken_1.default.verify(token, process.env.SECRET);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "User found",
            data: isVerifiedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    loginUser,
    loggedinUser,
};
