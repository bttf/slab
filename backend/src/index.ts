import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// hello

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello! what goin in hello ok\n");
});

app.listen(PORT, () => {
  console.log("Listening on port %s", PORT);
});
