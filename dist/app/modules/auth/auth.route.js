"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_controller_1.AuthController.loginUser);
exports.AuthRoutes = authRouter;
