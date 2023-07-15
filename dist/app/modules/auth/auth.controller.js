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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email, password } = req.body;
        const result = yield auth_service_1.AuthService.loginUser(email, password);
        if ((_a = result.data) === null || _a === void 0 ? void 0 : _a.accessToken) {
            res.cookie("token", (_b = result.data) === null || _b === void 0 ? void 0 : _b.accessToken);
        }
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    loginUser,
};
