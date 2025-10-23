import { Router } from "express";

/* Internal modules */
import { postLoginOwnerService } from "../../../../../../features/login/owner-login.services.js";

export const ownerLoginRouter = Router();

/* Routes */
ownerLoginRouter.post("/", postLoginOwnerService);
