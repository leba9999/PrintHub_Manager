import request from "supertest";
import { App } from "supertest/types";

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

export { getNotFound };
