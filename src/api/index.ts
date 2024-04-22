import express from "express";
import { getFilament } from "./routes/filamentRoute";

const router = express.Router();
/**
 * @swagger
 * /api/v1/filaments:
 *  get:
 *   summary: Get all filaments
 *  description: Get all filaments
 *
 */
router.route("/filaments").get(getFilament);

export default router;
