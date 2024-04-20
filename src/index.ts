import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { MysqlDataSource, MongoDataSource } from "./utils/Datasources";
import { Color } from "./entities/color.entity";
import logger from "./utils/loggers";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

MongoDataSource.initialize()
  .then(() => {
    app
      .listen(port, () => {
        logger.info(`Server is Fire at http://localhost:${port}`);
      })
      .on("error", (err) => {
        logger.error("Error during server startup", err);
      });
    logger.info("Data Source has been initialized!");
    const testColor = new Color();
    testColor.name = "Red";
    testColor.color = "#FF0000";
    MongoDataSource.manager.save(testColor);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
