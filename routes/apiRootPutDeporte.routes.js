import express from "express";
import { putDeportesHandler } from "../controller/deportesHandler.js";
const router = express.Router();

router.put('/', putDeportesHandler)

export default router