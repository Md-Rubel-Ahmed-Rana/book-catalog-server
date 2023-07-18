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
exports.ReadingController = void 0;
const reading_model_1 = require("./reading.model");
const addToReading = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reading_model_1.ReadingList.create(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const getReadingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reading_model_1.ReadingList.find({}).populate("book");
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
const markAsRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reading_model_1.ReadingList.updateOne({ _id: req.params.id }, { $set: { isRead: "read" } }, { upsert: true, new: true });
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.ReadingController = {
    addToReading,
    getReadingList,
    markAsRead,
};
