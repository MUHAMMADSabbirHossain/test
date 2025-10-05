import { app } from "./app/server.js";

const PORT = 5000;

/* Start the server */
app.listen(PORT, () => console.log(`🤖 Server started on port ${PORT}.`));
