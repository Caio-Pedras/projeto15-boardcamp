import rentSchema from "../schemas/rentSchema.js";
export default function validateRent(req, res, next) {
  const rent = req.body;
  const validation = rentSchema.validate(rent);
  if (validation.error) {
    return res.sendStatus(400);
  }
  next();
}
