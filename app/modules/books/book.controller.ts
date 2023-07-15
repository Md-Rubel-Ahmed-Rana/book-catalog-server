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
    const paginationOptions = pick(req.query, [
      "page",
      "limit",
      "sortBy",
      "sortOrder",
    ]);
    const filters: any = pick(req.query, bookFilterableFields);
    const result = await BookService.getAllBooks(filters, paginationOptions);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Books retrieved successfully!",
      data: {
        meta: result.meta,
        data: result.data,
      },
    });
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

export const BookController = {
  getAllBooks,
  createBook,
  getSingleBook,
};
