import express from "express";
const router = express.Router();
import { createValidations } from "./reservationsRoutesValidator";
import { create } from "../../controllers/reservationsController";

export default router.post(
  '/',
  createValidations,
  create,
);
