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
exports.BookController = void 0;
const pick_1 = __importDefault(require("../../../utils/pick"));
const book_constants_1 = require("./book.constants");
const book_service_1 = require("./book.service");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.createBook(req.body);
        res.status(200).json({
            statusCode: 201,
            success: true,
            message: "Book created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isYearExist = req.query.year;
        const isGenreExist = req.query.genre;
        const isSearchTermExist = req.query.searchTerm;
        if (!isYearExist) {
            delete req.query.year;
        }
        if (!isGenreExist) {
            delete req.query.genre;
        }
        if (!isSearchTermExist) {
            delete req.query.searchTerm;
        }
        const paginationOptions = (0, pick_1.default)(req.query, ["page", "limit"]);
        const filters = (0, pick_1.default)(req.query, book_constants_1.bookFilterableFields);
        const result = yield book_service_1.BookService.getAllBooks(filters, paginationOptions);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.getSingleBook(req.params.id);
        res.status(200).json({
            statusCode: 201,
            success: true,
            message: "Book retrieved successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.updateBook(req.params.id, req.body);
        res.status(200).json({
            statusCode: 201,
            success: true,
            message: "Book updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.deleteBook(req.params.id);
        res.status(200).json({
            statusCode: 201,
            success: true,
            message: "Book deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const reviewToBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.reviewToBook(req.params.id, req.body);
        res.status(200).json({
            statusCode: 201,
            success: true,
            message: "Review added successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    getAllBooks,
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
    reviewToBook,
};
