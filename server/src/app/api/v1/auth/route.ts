/* External modules */
import { Router } from "express";

/* Internal modules */
import { userRolesRouter } from "./user-roles/route.js";
import { registerRouter } from "./register/route.js";
import { loginRouter } from "./login/router.js";

export const authRouter = Router();

/* Middlewares */
authRouter.use("/user-roles", userRolesRouter);
authRouter.use("/register", registerRouter);
authRouter.use("/login", loginRouter);
