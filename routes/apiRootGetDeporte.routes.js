import express from "express";
import { getDeportesHandler } from "../controller/deportesHandler.js";
const router = express.Router();

router.get('/', getDeportesHandler)

export default router