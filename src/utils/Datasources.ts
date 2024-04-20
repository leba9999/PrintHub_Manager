import { DataSource } from "typeorm";

const MysqlDataSource = new DataSource({
  type: "mariadb",
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: (process.env.MONGO_PORT as unknown as number) || 3306,
  username: process.env.MONGO_USER || "",
  password: process.env.MONGO_PASS || "",
  database: process.env.MONGO_DB || "printManager",
  entities: [__dirname + "/../entities/*{.js,.ts}"],
});

const MongoDataSource = new DataSource({
  type: "mongodb",
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: (process.env.MONGO_PORT as unknown as number) || 27017,
  username: process.env.MONGO_USER || "",
  password: process.env.MONGO_PASS || "",
  database: process.env.MONGO_DB || "printManager",
  entities: [__dirname + "/../entities/*{.js,.ts}"],
});

export { MysqlDataSource, MongoDataSource };
