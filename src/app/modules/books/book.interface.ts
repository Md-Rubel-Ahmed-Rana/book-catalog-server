import { Model, Types } from "mongoose";

export type IReviews = {
  userId: string;
  review: string;
};

export type IBook = {
  title: string;
  author: string;
  authorId: Types.ObjectId;
  genre: string;
  publicationDate: Date;
  reviews?: IReviews[];
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
