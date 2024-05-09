import express from "express";
import { getFilament, postFilament } from "./routes/filamentRoute";

const router = express.Router();
router.route("/filaments").get(getFilament).post(postFilament);

export default router;
