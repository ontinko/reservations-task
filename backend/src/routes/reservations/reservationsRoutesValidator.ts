import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../types/request";
import { daysInMonth } from "../../helpers/misc";
import { prisma } from "../../prisma";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();
const currentHour = new Date().getHours();

const validateYear = (req: ExtendedRequest, _res: Response, next: NextFunction) => {
  const year = Number(req.body?.year);
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
  const month = Number(req.body?.month);
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

const validateDay = (req: ExtendedRequest, _res: Response, next: NextFunction) => {
  const day = Number(req.body?.day);
  const prevValuesValid = !req.validationErrors?.length;
  const year = Number(req.query?.year);
  const month = Number(req.query?.year);
  const errors: string[] = [];
  if (!Number.isInteger(day)) {
    errors.push("Day is required and must be a valid integer");
  } else if (day < 1 || day > 31 || prevValuesValid && day > daysInMonth({ year, month })) {
    errors.push("Day must be a valid day of month");
  } else if (prevValuesValid && year === currentYear && month === currentMonth && day < currentDay) {
    errors.push("Day must not be in the past");
  }

  if (errors.length) {
    req.validationErrors ||= [];
    req.validationErrors.push(...errors);
  }

  next();
}

const validateTimeslot = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const timeslot = Number(req.body?.timeslot);
  const prevValuesValid = !req.validationErrors?.length;
  const year = Number(req.query?.year);
  const month = Number(req.query?.year);
  const day = Number(req.query?.day);
  const errors: string[] = [];

  if (!Number.isInteger(timeslot)) {
    errors.push("Timeslot is required and must be a valid integer");

  } else if (timeslot < 0 && timeslot > 23) {
    errors.push("Timeslot must be a valid timeslot");

  } else if (prevValuesValid) {
    try {
      const schedule = await prisma.schedule.findFirst();
      if (!schedule) {
        return res.status(400).json({ message: "We are closed, bye" });
      }

      const { startHour, endHour } = schedule;
      if (timeslot < startHour || timeslot >= endHour) {
        errors.push("Invalid timeslot");
      } else if (year === currentYear && month === currentMonth && day === currentDay && timeslot <= currentHour) {
        errors.push("Timeslot must not be in the past");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (errors.length) {
    req.validationErrors ||= [];
    req.validationErrors.push(...errors);
  }

  next();
}

export const createValidations = [
  validateYear,
  validateMonth,
  validateDay,
  validateTimeslot,
];
