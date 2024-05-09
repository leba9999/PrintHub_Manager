import express from "express";
import { getFilament } from "./routes/filamentRoute";

const router = express.Router();
router.route("/filaments").get(getFilament);

export default router;
