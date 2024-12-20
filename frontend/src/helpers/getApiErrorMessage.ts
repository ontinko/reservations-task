import { AxiosError } from "axios";

type ApiError = { message: string; errors: undefined };

export const getApiErrorMessage = (error: AxiosError<
  ApiError | { errors: ApiError[]; message: undefined }
>): string => {
  let message = "Something went wrong";
  if (error.response?.data.errors) {
    message = (error.response.data.errors.map(e => e.message)).join("\n");
  } else if (error.response?.data.message) {
    message = error.response.data.message;
  }

  return message;
}
