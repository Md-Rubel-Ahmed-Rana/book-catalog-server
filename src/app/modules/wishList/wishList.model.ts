import { Schema, model } from "mongoose";

const wishListSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

export const WishListBooks = model("WishList", wishListSchema);
