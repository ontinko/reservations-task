import { Response } from "express";
import { createReservation } from "../helpers/reservations";
import { ReservationData } from "../types/reservation";
import { ExtendedRequest } from "../types/request";

export const create = async (req: ExtendedRequest, res: Response) => {
  const validationErrors = req.validationErrors;
  if (validationErrors) {
    return res.status(400).json({
      errors: validationErrors.map(e => {
        return {
          message: e,
        }
      }),
    });
  }

  const { year, month, day, timeslot } = req.body as ReservationData;

  try {
    const { error } = await createReservation({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      timeslot: Number(timeslot),
    });

    if (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
