import { Response } from "express";
import { getTimeslots } from "../helpers/timeslots";
import { ExtendedRequest } from "../types/request";

export const get = async (req: ExtendedRequest, res: Response) => {
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

  const { year, month } = req.query as { year: string; month: string };

  try {
    const { data, error } = await getTimeslots({
      year: Number(year),
      month: Number(month),
    });

    if (error) {
      return res.status(201).json({
        message: error.message,
      });
    }

    return res.status(200).json({
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

