import { Router } from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { validateUser } from "../middlewares/inputValidator.js";

const router = Router();

router.post("/user", validateUser, createUser);

router.get("/user", getAllUsers);

router.get("/user/:id", getUserById);

router.put("/user/:id", validateUser, updateUser);

router.delete("/user/:id", deleteUser);

export { router as userRoutes };
