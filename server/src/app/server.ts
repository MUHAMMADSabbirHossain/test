/* External modules */
import express from "express";
import cors from "cors";

/* Internal modules */
import { pingRouter } from "./api/ping/ping.js";
import { v1Router } from "./api/v1/route.js";

/* Express app instance */
export const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://your-nextjs-domain.com"
      : "http://localhost:3000", // Or your Next.js dev URL
  credentials: true, // Allow credentials
};

/* Middlewares */
app.use(express.json());
app.use(cors(corsOptions));

/* API's version router controller */
app.use("/api/ping", pingRouter);
app.use("/api/v1", v1Router);
