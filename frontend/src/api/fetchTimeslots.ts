import axios, { AxiosError } from "axios";
import { Result } from "../types/result";
import { TimeslotData, TimeslotsDTO } from "../types/timeslot";
import { getApiErrorMessage } from "../helpers/getApiErrorMessage";

export const fetchTimeslots = async ({
  year,
  month,
}: TimeslotData): Promise<Result<TimeslotsDTO>> => {
  try {
    const params: TimeslotData = { year, month };
    const response = await axios.get("http://localhost:3000/timeslots", {
      params,
    });
    return {
      error: null,
      data: response.data.data,
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
      error: message,
    };
  }
}
