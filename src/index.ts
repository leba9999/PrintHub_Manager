import dotenv from "dotenv";
import { MongoDataSource } from "./utils/Datasources";
import logger from "./utils/loggers";
import app from "./app";

//For env File
dotenv.config();

const port = process.env.PORT || 8000;

MongoDataSource.initialize()
  .then(() => {
    app
      .listen(port, async () => {
        logger.info(`Server is Fire at http://localhost:${port}`);
      })
      .on("error", (err) => {
        logger.error("Error during server startup", err);
      });
    logger.info("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
