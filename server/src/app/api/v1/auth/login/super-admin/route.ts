import { Router } from "express";

export const superAdminRouter = Router();

/* Routes */
superAdminRouter.post("/", (req, res) => {
  res.send("Hello, Super Admin!").status(200);
});
