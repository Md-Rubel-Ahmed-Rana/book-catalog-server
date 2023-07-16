import { Router } from "express";
import { BookController } from "./book.controller";

const bookRouter = Router();

bookRouter.post("/create-book", BookController.createBook);
bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getSingleBook);
bookRouter.patch("/:id", BookController.updateBook);
bookRouter.delete("/:id", BookController.deleteBook);
bookRouter.put("/:id", BookController.reviewToBook);

export const BookRoutes = bookRouter;
