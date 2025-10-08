import express from "express";
import { prisma } from "./src/config/db.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.json({ message: "Hello World! Welcome to Prisma ORM..." });
});

app.post("/api/users", async (req, res) => {
  console.log(req.body);

  const { name, email, bio } = req.body;

  // TODO: validation

  const user = await prisma.user.create({
    data: {
      email,
      name,
      profile: {
        create: {
          bio,
        },
      },
    },
  });

  res.json(user);
});

app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: 1,
    },
  });

  res.json(post);
});

app.get("/api/posts", async (req, res) => {
  const { skip = 0, take = 10 } = req.query;
  const posts = await prisma.user.findMany({ skip, take });

  res.json(posts);
});

app.listen(5000, () => console.log("🤖 Server started on port 5000."));
