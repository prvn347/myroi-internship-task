import express, { Request, Response } from "express";
import routes from "./route";

const app = express();

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json());
app.use("/api", routes);
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
