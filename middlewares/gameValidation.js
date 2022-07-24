import gameSchema from "../schemas/gameSchema.js";
export default function validateGame(req, res, next) {
  const game = req.body;
  console.log(game);
  const validation = gameSchema.validate(game);
  if (validation.error) {
    return res.sendStatus(400);
  }
  next();
}
