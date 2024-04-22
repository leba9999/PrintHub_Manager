import { Application, Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import logger from "./loggers";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Filament Manager REST API",
      version,
      description: "A simple REST API to manage your 3D printer filaments",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8000",
        description: "Dev server",
      },
    ],
  },
  apis: ["./src/api/routes/*.ts", "./src/api/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Application) => {
  logger.info("Serving Swagger UI");
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(`Docs available a http://localhost:8000/docs`);
};

export default swaggerDocs;
