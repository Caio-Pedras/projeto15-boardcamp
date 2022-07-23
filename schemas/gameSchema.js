import joi from "joi";
const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  sotckTotal: joi.string().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.string().required(),
});
export default gameSchema;