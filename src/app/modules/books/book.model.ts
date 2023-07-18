import { Schema, model } from "mongoose";
import { IBook, IBookModel } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
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
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    reviews: Array,
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, IBookModel>("Book", bookSchema);
