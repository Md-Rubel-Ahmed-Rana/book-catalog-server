import { SortOrder } from "mongoose";
import { paginationOptionsType } from "../../../utils/pagination";
import { paginationHelper } from "../../../utils/paginationHelper";
import { bookSearchableFields } from "./book.constants";
import { IBook, IBookFilter, IGenericResponse } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (book: IBook) => {
  const result = await Book.create(book);
  return result;
};

const getAllBooks = async (
  filters: IBookFilter,
  paginationOptions: paginationOptionsType
): Promise<IGenericResponse<IBook[]>> => {
  // dynamic searching
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map((field) => ({
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
  const {
    page = 1,
    limit = 10,
    skip = 0,
    sortBy,
    sortOrder,
  } = paginationHelper.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // retrieving data
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Book.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  getAllBooks,
  createBook,
};
