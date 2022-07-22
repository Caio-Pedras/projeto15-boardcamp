import { Router } from "express";

const gameRouter = Router();

gameRouter.get("/games");
gameRouter.post("/games");

export default gameRouter;
