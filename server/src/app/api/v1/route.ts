/* External modules */
import { Router } from "express";

/* Internal modules */
import { authRouter } from "./auth/route.js";

export const v1Router = Router();

/* Middlewares */
v1Router.use("/auth", authRouter);
