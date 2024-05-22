import express from "express";
import { deleteDeporteHandler } from "../controller/deportesHandler.js";
const router = express.Router();

router.delete('/', deleteDeporteHandler)

export default router