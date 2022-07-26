import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import validateCustomer from "../middlewares/customerValidation.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.post("/customers", validateCustomer, createCustomer);
customerRouter.put("/customers/:id", validateCustomer, updateCustomer);

export default customerRouter;
