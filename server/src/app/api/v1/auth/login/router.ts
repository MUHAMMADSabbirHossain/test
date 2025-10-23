/* External modules */
import { Router } from "express";

/* Internal modules */
import { superAdminRouter } from "./super-admin/route.js";
import { ownerLoginRouter } from "./owner/route.js";

export const loginRouter = Router();

/* Middlewares */
loginRouter.use("/super-admin", superAdminRouter);
loginRouter.use("/owner", ownerLoginRouter);
