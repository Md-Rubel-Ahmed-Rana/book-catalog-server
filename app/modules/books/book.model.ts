import { Schema, model } from "mongoose";
import { IBook, IBookModel } from "./book.interface";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    default: Date.now(),
  },
  reviews: {
    userId: {
      type: String,
    },
    review: {
      type: String,
    },
  },
});

export const Book = model<IBook, IBookModel>("Book", bookSchema);
