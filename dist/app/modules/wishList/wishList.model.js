"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListBooks = void 0;
const mongoose_1 = require("mongoose");
const wishListSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
}, { timestamps: true });
exports.WishListBooks = (0, mongoose_1.model)("WishList", wishListSchema);
