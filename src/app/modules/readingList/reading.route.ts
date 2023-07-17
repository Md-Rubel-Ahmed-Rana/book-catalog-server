import { Router } from "express";
import { ReadingController } from "./reading.controller";

const router = Router();

router.put("/:id", ReadingController.markAsRead);
router.post("/", ReadingController.addToReading);
router.get("/", ReadingController.getReadingList);

export const ReadingRoutes = router;
