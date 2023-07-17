"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = require("express");
const wishList_controler_1 = require("./wishList.controler");
const router = (0, express_1.Router)();
router.post("/", wishList_controler_1.WishListContoller.addBook);
router.get("/", wishList_controler_1.WishListContoller.getBooks);
exports.WishListRoutes = router;
