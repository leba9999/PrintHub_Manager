import { DataSource } from "typeorm";

const MysqlDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "olso",
  password: "olso",
  database: "printManager",
  entities: [__dirname + "/../entities/*{.js,.ts}"],
});

const MongoDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  entities: ["../entities/*{.js,.ts}"],
});

export { MysqlDataSource, MongoDataSource };
