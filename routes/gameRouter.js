import { Router } from "express";
import { createGame, getGames } from "../controllers/gameController";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", createGame);

export default gameRouter;
