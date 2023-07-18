import { NextFunction, Request, Response } from "express";
import pick from "../../../utils/pick";
import { bookFilterableFields } from "./book.constants";
import { BookService } from "./book.service";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.createBook(req.body);
    res.status(200).json({
      statusCode: 201,
      success: true,
      message: "Book created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
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
    const paginationOptions = pick(req.query, ["page", "limit"]);
    const filters: any = pick(req.query, bookFilterableFields);
    const result = await BookService.getAllBooks(filters, paginationOptions);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookService.getSingleBook(req.params.id);
    res.status(200).json({
      statusCode: 201,
      success: true,
      message: "Book retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.updateBook(req.params.id, req.body);
    res.status(200).json({
      statusCode: 201,
      success: true,
      message: "Book updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.deleteBook(req.params.id);
    res.status(200).json({
      statusCode: 201,
      success: true,
      message: "Book deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const reviewToBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookService.reviewToBook(req.params.id, req.body);
    res.status(200).json({
      statusCode: 201,
      success: true,
      message: "Review added successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  reviewToBook,
};
