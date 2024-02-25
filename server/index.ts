import express from "express";
import rootRouter from "./routes";
import dotenv from "dotenv";
dotenv.config();
const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// Handle preflight requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).send();
});
app.use("/", rootRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
