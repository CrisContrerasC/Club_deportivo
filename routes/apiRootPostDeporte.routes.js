import express from "express";
import { postDeportesHandler } from "../controller/deportesHandler.js";
const router = express.Router();

router.post('/', postDeportesHandler)

export default router