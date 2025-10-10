import express from "express";
import cors from "cors";

import { orderRoutes } from "./routes/order.route";

const PORT = process.env.PORT || 5000;
const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* Routes */
app.get("/", (_, response) => {
  response
    .status(200)
    .json({ message: `Hello World! Welcome to Express Docker...` });
});

app.use("/api/v1/orders", orderRoutes);

/* Server start */
app.listen(PORT, () => console.log(`🤖 Server started on port ${PORT}.`));
