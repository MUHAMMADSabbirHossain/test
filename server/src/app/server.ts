import express from "express";
import cors from "cors";

import { v1Router } from "./api/v1/v1-router.js";

/* Express app instance */
export const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API's version router controller */
app.use("/api/v1", v1Router);
