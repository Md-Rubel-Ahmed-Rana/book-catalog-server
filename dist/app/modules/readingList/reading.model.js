"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingList = void 0;
const mongoose_1 = require("mongoose");
const readingSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isRead: {
        type: String,
        default: "unread",
    },
}, {
    timestamps: true,
});
exports.ReadingList = (0, mongoose_1.model)("ReadingList", readingSchema);
