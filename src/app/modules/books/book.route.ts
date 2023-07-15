import { Router } from "express";
import { BookController } from "./book.controller";

const bookRouter = Router();

bookRouter.post("/create-book", BookController.createBook);
bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getSingleBook);
bookRouter.patch("/:id", BookController.updateBook);
bookRouter.delete("/:id", BookController.deleteBook);

export const BookRoutes = bookRouter;
