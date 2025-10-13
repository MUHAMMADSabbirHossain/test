import { Router } from "express";

export const pingRouter = Router();

/* Ping endpoint */
pingRouter.get("/", (req, res) => res.send("pong").status(200));
