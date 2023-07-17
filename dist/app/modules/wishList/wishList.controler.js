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
exports.WishListContoller = void 0;
const wishList_model_1 = require("./wishList.model");
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const books = yield wishList_model_1.WishListBooks.create(req.body);
        res.send(books);
    }
    catch (error) {
        next(error);
    }
});
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield wishList_model_1.WishListBooks.find({}).populate("bookId");
        res.send(books);
    }
    catch (error) {
        next(error);
    }
});
exports.WishListContoller = {
    getBooks,
    addBook,
};
