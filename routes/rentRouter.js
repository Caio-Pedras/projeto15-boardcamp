import { Router } from "express";

const rentRouter = Router();

rentRouter.get("/rent");
rentRouter.post("/rent");
rentRouter.post("/rent/:id/return");
rentRouter.delete("/rent/:id");

export default rentRouter;
