/* External modules */
import { Router } from "express";

/* Internal modules */
import { postCreateUserRolesService } from "../../../../../features/user-roles/user-roles.services.js";

export const userRolesRouter = Router();

/* Routes */
userRolesRouter.post("/", postCreateUserRolesService);
