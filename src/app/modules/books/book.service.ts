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
    limit = 9,
    skip = 0,
  } = paginationHelper.calculatePagination(paginationOptions);

  // retrieving data
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Book.find(whereCondition)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("authorId");
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

const getSingleBook = async (id: string) => {
  const result = await Book.findById(id).populate("authorId");
  return result;
};
const updateBook = async (id: string, updatedData: Partial<IBook>) => {
  const result = await Book.findByIdAndUpdate(id, updatedData, {
    upsert: true,
    new: true,
  }).populate("authorId");
  return result;
};
const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id).populate("authorId");
  return result;
};

const reviewToBook = async (id: string, reviewData: any) => {
  const result = await Book.updateOne(
    { _id: id },
    { $push: { reviews: reviewData } },
    { upsert: true, new: true }
  );
  return result;
};

export const BookService = {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  reviewToBook,
};
