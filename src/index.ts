import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { MysqlDataSource, MongoDataSource } from "./utils/Datasources";
import { Color } from "./entities/color.entity";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

MongoDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
    console.log("Data Source has been initialized!");
    const testColor = new Color();
    testColor.name = "Red";
    testColor.color = "#FF0000";
    MongoDataSource.manager.save(testColor);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
