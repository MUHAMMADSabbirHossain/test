import { Router } from "express";

import { v1UsersRouter } from "./users/users-routes.js";
import { v1AdminsRouter } from "./admins/admins-routes.js";

export const v1Router = Router();

/* routes */
v1Router.use("/admins", v1AdminsRouter);
