import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.post("/categories", createCategory);

export default categoryRouter;
