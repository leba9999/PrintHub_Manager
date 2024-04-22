import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorHandler, notFound } from "./utils/Middlewares";
import api from "./api";
import swaggerDocs from "./utils/swagger";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  // Create a simple response if the user hits the root URL in development but not in production.
  if (process.env.NODE_ENV !== "development") {
    next(); // Pass the request to the next handler if the environment is not development
    return;
  }
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/v1", api);

swaggerDocs(app);

app.use(notFound);
app.use(errorHandler);

export default app;
