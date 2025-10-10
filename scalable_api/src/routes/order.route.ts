import { Router } from "express";

import { orderControllers } from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.post("/", orderControllers.createOrder);
orderRoutes.get("/", orderControllers.getOrders);
orderRoutes.put("/:id", orderControllers.updateOrder);
orderRoutes.delete("/:id", orderControllers.deleteOrder);
