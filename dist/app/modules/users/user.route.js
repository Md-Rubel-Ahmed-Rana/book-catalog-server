"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/create-user", user_controller_1.UserController.createUser);
userRouter.get("/:id", user_controller_1.UserController.getUser);
exports.UserRoutes = userRouter;
