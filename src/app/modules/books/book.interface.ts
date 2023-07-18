import { Model, Types } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  authorId: Types.ObjectId;
  genre: string;
  publicationDate: string;
  reviews?: any;
  year: string;
};

export type IBookModel = Model<IBook>;

export type IBookFilter = {
  searchTerm: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
