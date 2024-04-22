import dotenv from "dotenv";
import { MysqlDataSource, MongoDataSource } from "./utils/Datasources";
import { Color } from "./entities/color.entity";
import logger from "./utils/loggers";
import app from "./app";
import swaggerDocs from "./utils/swagger";
import { Filament } from "./entities/filament.entity";

//For env File
dotenv.config();

const port = process.env.PORT || 8000;

MongoDataSource.initialize()
  .then(() => {
    app
      .listen(port, async () => {
        logger.info(`Server is Fire at http://localhost:${port}`);

        const color = new Color();
        color.name = "Red";
        color.hex = "#FF0000";
        const savedcolor = await MongoDataSource.getRepository(Color).save(
          color
        );

        const filament = new Filament();
        filament.name = "Filament";
        filament.material = "PLA";
        filament.diameter = 1.75;
        filament.color = savedcolor;
        filament.brand = "Generic";
        filament.url = "https://www.google.com";
        filament.amount = 1000;
        filament.totalAmount = 1000;
        await MongoDataSource.getRepository(Filament).save(filament);
      })
      .on("error", (err) => {
        logger.error("Error during server startup", err);
      });
    logger.info("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
