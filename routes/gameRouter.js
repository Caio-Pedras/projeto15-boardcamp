import { Router } from "express";
import { createGame, getGames } from "../controllers/gameController.js";
import validateGame from "../middlewares/gameValidation.js";
const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateGame, createGame);

export default gameRouter;
