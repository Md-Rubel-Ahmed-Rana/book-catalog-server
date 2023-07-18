"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const book_route_1 = require("./app/modules/books/book.route");
const reading_route_1 = require("./app/modules/readingList/reading.route");
const user_route_1 = require("./app/modules/users/user.route");
const wishList_route_1 = require("./app/modules/wishList/wishList.route");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
dotenv_1.default.config();
(0, config_1.default)();
// root route
app.get("/", (req, res, next) => {
    try {
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Server is working fine!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
// application routes
app.use("/api/v1/users", user_route_1.UserRoutes);
app.use("/api/v1/auth", auth_route_1.AuthRoutes);
app.use("/api/v1/books", book_route_1.BookRoutes);
app.use("/api/v1/wishlist", wishList_route_1.WishListRoutes);
app.use("/api/v1/readinglist", reading_route_1.ReadingRoutes);
app.use("*", (req, res, next) => {
    try {
        res.status(404).json({
            statusCode: 404,
            success: false,
            message: `Your route '${req.originalUrl}' is not found`,
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
app.use((error, req, res, next) => {
    res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Your route '${req.originalUrl}' is not found`,
        data: {
            error: error === null || error === void 0 ? void 0 : error.message,
        },
    });
});
exports.default = app;
