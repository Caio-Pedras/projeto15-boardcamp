import customerSchema from "../schemas/customerSchema.js";
export default function validateCustomer(req, res, next) {
  const customer = req.body;
  const validation = customerSchema.validate(customer);
  if (validation.error) {
    return res.sendStatus(400);
  }
  next();
}
