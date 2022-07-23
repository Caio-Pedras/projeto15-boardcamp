import { Router } from "express";
import {
  createRent,
  deleteRent,
  finishRent,
  getRents,
} from "../controllers/rentController.js";
import validateRent from "../middlewares/rentValidation.js";

const rentRouter = Router();

rentRouter.get("/rentals", getRents);
rentRouter.post("/rentals", validateRent, createRent);
rentRouter.post("/rentals/:id/return", finishRent);
rentRouter.delete("/rentals/:id", deleteRent);

export default rentRouter;
