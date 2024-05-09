import e from "express";
import app from "../src/app";
import { iFilament, iFilamentWithColor } from "../src/interfaces/filament";
import { MongoDataSource } from "../src/utils/Datasources";
import logger from "../src/utils/loggers";
import {
  getFilaments,
  getNotFound,
  postErrorFilament,
  postFilament,
} from "./apiTestFunctions";
import { ErrorMessageResponse } from "../src/interfaces/responses";

describe("Testing user interactions with API filament storage", () => {
  beforeAll(async () => {
    logger.silent = false; // turn off logging
    console.log(process.env.MONGO_HOST);
    console.log(process.env.MONGO_PORT);
    console.log(process.env.MONGO_DB);
    console.log(process.env.MONGO_USER);
    console.log(process.env.MONGO_PASS);
    const test = await MongoDataSource.initialize();
    console.log(test);
  }, 10000);
  afterAll(async () => {
    logger.silent = false; // turn on logging
    await MongoDataSource.destroy();
  });
  // test not found
  it("API responds with a not found message", async () => {
    await getNotFound(app);
  });

  // test error handling
  it("API responds with a error message", async () => {
    await getNotFound(app);
  });

  // test post filament
  it("API responds with a post message", async () => {
    const body = {
      name: "Filament",
      material: "PLA",
      diameter: 1.75,
      color: {
        name: "Red",
        hex: "#FF0000",
      },
      brand: "Generic",
      url: "https://www.google.com",
      amount: 1000,
      totalAmount: 1000,
    } as iFilamentWithColor;
    await postFilament(app, body);
  });

  // test post filament without color
  it("API responds with a post message without color", async () => {
    const body = {
      name: "Filament",
      material: "PLA",
      diameter: 1.75,
      brand: "Generic",
      url: "https://www.google.com",
      amount: 1000,
      totalAmount: 1000,
    } as iFilament;
    const response = (await postErrorFilament(
      app,
      body
    )) as ErrorMessageResponse;
    expect(response).toBeDefined();
    expect(response.message).toBeDefined();
    expect(response.message).toBe(
      "Color ID or object not provided in the request body! Attempting to create a filament without a color is not allowed!"
    );
    console.log(response);
  });

  // test post filament with both color and color_id
  it("API responds with a post message with both color and color_id", async () => {
    const body = {
      name: "Filament",
      material: "PLA",
      diameter: 1.75,
      color: {
        name: "Red",
        hex: "#FF0000",
      },
      color_id: "123",
      brand: "Generic",
      url: "https://www.google.com",
      amount: 1000,
      totalAmount: 1000,
    } as any;
    const response = (await postErrorFilament(
      app,
      body
    )) as ErrorMessageResponse;
    expect(response).toBeDefined();
    expect(response.message).toBeDefined();
    expect(response.message).toBe(
      "Both color ID and object provided in the request body! Please provide only one!"
    );
    console.log(response);
  });

  // test get filament
  it("API responds with a get message", async () => {
    const filaments = await getFilaments(app);
    expect(filaments).toBeDefined();
    console.log(filaments);
    expect(filaments.length).toBeGreaterThan(0);
    expect(filaments[0].name).toBeDefined();
    expect(filaments[0].material).toBeDefined();
    expect(filaments[0].diameter).toBeDefined();
    expect(filaments[0].color_id).toBeDefined();
    expect(filaments[0].brand).toBeDefined();
    expect(filaments[0].url).toBeDefined();
    expect(filaments[0].amount).toBeDefined();
    expect(filaments[0].totalAmount).toBeDefined();
  });
});
