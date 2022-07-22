import joi from "joi";
const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi
    .string()
    .pattern(/(^([0-9]){3}([0-9]){3}([0-9]){3}([0-9]){2}$)/)
    .required(),
  birthday: joi.date().required(),
});
export default customerSchema;
