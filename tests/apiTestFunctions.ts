import request from "supertest";
import { App } from "supertest/types";
import { iFilament } from "../src/interfaces/filament";

const getNotFound = (url: string | App) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get("/what-is-this")
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const postFilament = (url: string | App, body: iFilament) => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/api/v1/filaments")
      .send(body)
      .expect(201, (err, response) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(response.body);
        }
      });
  });
};
const postErrorFilament = (url: string | App, body: iFilament) => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/api/v1/filaments")
      .send(body)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getFilaments = (url: string | App) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/filaments`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(response.body);
        }
      });
  }) as Promise<iFilament[]>;
};

export { getNotFound, postFilament, getFilaments, postErrorFilament };
