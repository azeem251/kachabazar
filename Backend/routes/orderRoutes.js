// import express from "express";
// import { confirmOrder } from "../controllers/orderController.js";
// const router = express.Router();
// router.post("/confirm", confirmOrder);
// export default router;



import express from "express";
import { confirmOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import  protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/confirm", protect, confirmOrder);
router.get("/my-orders", protect, getMyOrders);
router.get('/:id', protect, getOrderById);
export default router;

