import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/categories");
categoryRouter.post("/categories");

export default categoryRouter;
