import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { pool } from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { errorHandling } from "./middlewares/errorHandler.js";
import { createUserTable } from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Create table before starting the server if not exist */
createUserTable();

app.use("/api", userRoutes);

/* Routes */
/* Testing PostgreSQL connection */
app.get("/", async (request, response) => {
  const result = await pool.query("SELECT current_database()");

  response.json(`The database name is ${result.rows[0].current_database}`);
});

/* Error handling middleware */
app.use(errorHandling);

/* Start the server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
