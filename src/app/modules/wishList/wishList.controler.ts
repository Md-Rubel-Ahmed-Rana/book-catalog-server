import { NextFunction, Request, Response } from "express";
import { WishListBooks } from "./wishList.model";

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const books = await WishListBooks.create(req.body);
    res.send(books);
  } catch (error) {
    next(error);
  }
};
const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await WishListBooks.find({}).populate("bookId");
    res.send(books);
  } catch (error) {
    next(error);
  }
};

export const WishListContoller = {
  getBooks,
  addBook,
};
