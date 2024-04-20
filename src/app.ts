import express, { Application } from "express";
import cors from "cors";
import { errorHandler, notFound } from "./utils/Middlewares";
import api from "./api";
import CustomError from "./classes/CustomError";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  // Create a simple response if the user hits the root URL in development but not in production. Throw an error in production.
  if (process.env.NODE_ENV !== "development") {
    throw new CustomError("Endpoint not found", 404);
  }
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;
