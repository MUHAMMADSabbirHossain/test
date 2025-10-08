import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ message: "Hello World! Welcome to Express Docker..." });
});

app.listen(5000, () => console.log("🤖 Server started on port 5000."));
