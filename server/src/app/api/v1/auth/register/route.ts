import { Router } from "express";

/* Internal modules */
import { registerOwnerRouter } from "./owner/route.js";

export const registerRouter = Router();

/* Routes */
registerRouter.use("/owner", registerOwnerRouter);
