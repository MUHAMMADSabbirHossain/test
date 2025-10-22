import { Router } from "express";
import { postCreateOwnerService } from "../../../../../../features/register/owner-register.services.js";

export const registerOwnerRouter = Router();

/* Routes */
registerOwnerRouter.post("/", postCreateOwnerService);
