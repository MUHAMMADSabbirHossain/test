import type { Request, Response } from "express";

import { prisma } from "../lib/prisma";

export const orderControllers = {
  createOrder: async (req: Request, res: Response) => {
    try {
      const { name, description, category } = req.body;

      if (!name || !description || !category)
        return res.status(400).json({
          success: false,
          message: "All fields(name, description, category) are required.",
        });

      const orders = await prisma.order.create({
        data: {
          name,
          description,
          category,
        },
      });

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        orders,
      });
    } catch (error) {
      console.error(`Internal server error while creating orders: ${error}`);

      return res.status(500).json({
        message: "Internal server error while creating orders",
      });
    }
  },
  getOrders: async (req: Request, res: Response) => {
    try {
      const orders = await prisma.order.findMany({});

      if (!orders)
        return res
          .status(404)
          .json({ success: false, message: "Orders not found." });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error(`Internal server error while fetching orders: ${error}`);

      return res.status(500).json({
        message: "Internal server error while fetching orders",
      });
    }
  },
  updateOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, category } = req.body;

      const order = await prisma.order.update({
        where: { id: id },
        data: {
          name,
          description,
          category,
        },
      });

      if (!order)
        return res.status(404).json({
          message: "Order not found",
          success: false,
        });

      res.status(200).json({
        message: "Order updated successfully",
        order,
        success: true,
      });
    } catch (error) {
      console.error(`Internal server error while updating orders: ${error}`);

      return res.status(500).json({
        message: "Internal server error while updating orders",
      });
    }
  },
  deleteOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const order = await prisma.order.delete({
        where: { id: id },
      });

      res.status(200).json({
        message: "Order deleted successfully",
        order,
      });
    } catch (error) {
      console.error(`Internal server error while deleting orders: ${error}`);

      return res.status(500).json({
        message: "Internal server error while deleting orders",
      });
    }
  },
};
