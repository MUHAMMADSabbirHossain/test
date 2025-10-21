/* External modules */
import express from "express";
import cors from "cors";

/* Internal modules */
import { pingRouter } from "./api/ping/ping.js";
import { v1Router } from "./api/v1/route.js";

/* Express app instance */
export const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API's version router controller */
app.use("/api/ping", pingRouter);
app.use("/api/v1", v1Router);
