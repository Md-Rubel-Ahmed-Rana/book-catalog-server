import { Router } from "express";
import { WishListContoller } from "./wishList.controler";

const router = Router();

router.post("/", WishListContoller.addBook);
router.get("/", WishListContoller.getBooks);

export const WishListRoutes = router;
