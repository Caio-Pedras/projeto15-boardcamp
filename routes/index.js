import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import customerRouter from "./customerRouter.js";
import gameRouter from "./gameRouter.js";
import rentRouter from "./rentRouter.js";

const router = Router();

router.use(categoryRouter);
router.use(gameRouter);
router.use(customerRouter);
router.use(rentRouter);

export default router;
