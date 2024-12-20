import axios, { AxiosError } from "axios";
import { Result } from "../types/result";
import { getApiErrorMessage } from "../helpers/getApiErrorMessage";
import { ReservationData } from "../types/reservation";

export const createReservation = async ({
  year,
  month,
  day,
  timeslot
}: ReservationData): Promise<Result<null>> => {
  try {
    const body: ReservationData = { year, month, day, timeslot };
    await axios.post("http://localhost:3000/reservations", body);
    return {
      error: null,
      data: null,
    };
  } catch (err) {
    let message;
    if (err instanceof AxiosError) {
      message = getApiErrorMessage(err);
    } else {
      message = "Something went wrong";
    }
    return {
      data: null,
      error: {
        message,
      },
    };
  }
}

