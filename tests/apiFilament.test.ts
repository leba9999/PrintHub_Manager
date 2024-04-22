import app from "../src/app";
import logger from "../src/utils/loggers";
import { getNotFound } from "./apiTestFunctions";

describe("Testing user interactions with API filament storage", () => {
  beforeAll(async () => {
    logger.silent = true; // turn off logging
  }, 10000);
  afterAll(async () => {
    logger.silent = false; // turn on logging
  });
  // test not found
  it("API responds with a not found message", async () => {
    await getNotFound(app);
  });

  // test error handling
  it("API responds with a error message", async () => {
    await getNotFound(app);
  });
});
