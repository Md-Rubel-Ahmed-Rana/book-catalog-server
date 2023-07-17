import { NextFunction, Request, Response } from "express";
import { ReadingList } from "./reading.model";

const addToReading = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ReadingList.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ReadingList.find({}).populate("book");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReadingList.updateOne(
      { _id: req.params.id },
      { $set: { isRead: "read" } },
      { upsert: true, new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const ReadingController = {
  addToReading,
  getReadingList,
  markAsRead,
};
