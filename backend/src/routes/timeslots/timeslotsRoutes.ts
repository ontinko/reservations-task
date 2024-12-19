import express from "express";
const router = express.Router();
import { getValidations } from "./timeslotsRoutesValidator";
import { get } from "../../controllers/timeslotsController";

export default router.get(
  '/',
  getValidations,
  get,
);
