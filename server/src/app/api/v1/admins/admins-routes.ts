import { Router } from "express";

import { postAdminsRegisterHandler } from "./admins-handlers.js";

export const v1AdminsRouter = Router();

/* routes */
v1AdminsRouter.post("/", postAdminsRegisterHandler);
