const currentYear = (new Date()).getFullYear();
const currentMonth = (new Date()).getMonth() + 1;

import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../types/request";

const validateYear = (req: ExtendedRequest, _res: Response, next: NextFunction) => {
  const year = Number(req.query?.year);
  const errors: string[] = [];
  if (!Number.isInteger(year)) {
    errors.push("Year is required and must be a valid integer");
  } else if (year < currentYear) {
    errors.push("Year must not be in the past");
  }

  if (errors.length) {
    req.validationErrors ||= [];
    req.validationErrors.push(...errors);
  }

  next();
}

const validateMonth = (req: ExtendedRequest, _res: Response, next: NextFunction) => {
  const month = Number(req.query?.month);
  const prevValuesValid = !req.validationErrors?.length;
  const year = Number(req.query?.year);
  const errors: string[] = [];
  if (!Number.isInteger(month)) {
    errors.push("Month is required and must be a valid integer");
  } else if (month < 1 || month > 12) {
    errors.push("Month must be valid");
  } else if (prevValuesValid && year === currentYear && month < currentMonth) {
    errors.push("Month must not be in the past");
  }

  if (errors.length) {
    req.validationErrors ||= [];
    req.validationErrors.push(...errors);
  }

  next();
}


export const getValidations = [
  validateYear,
  validateMonth,
];
