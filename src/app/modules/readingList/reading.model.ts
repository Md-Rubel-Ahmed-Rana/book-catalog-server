import { Schema, model } from "mongoose";

const readingSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isRead: {
      type: String,
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);

export const ReadingList = model("ReadingList", readingSchema);
