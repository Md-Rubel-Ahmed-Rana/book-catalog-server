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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../utils/paginationHelper");
const book_constants_1 = require("./book.constants");
const book_model_1 = require("./book.model");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(book);
    return result;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // dynamic searching
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: book_constants_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // filtering
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // pagination
    const { page = 1, limit = 9, skip = 0, } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    // retrieving data
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield book_model_1.Book.find(whereCondition)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("authorId");
    const total = yield book_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).populate("authorId");
    return result;
});
const updateBook = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndUpdate(id, updatedData, {
        upsert: true,
        new: true,
    }).populate("authorId");
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete(id).populate("authorId");
    return result;
});
const reviewToBook = (id, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.updateOne({ _id: id }, { $push: { reviews: reviewData } }, { upsert: true, new: true });
    return result;
});
exports.BookService = {
    getAllBooks,
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
    reviewToBook,
};
