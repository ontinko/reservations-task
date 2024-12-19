export type ApiError = {
  status: number;
  message: string;
};

export type ResultSuccess<T> = {
  data: T;
  error: null;
};

export type ResultError = {
  data: null;
  error: ApiError;
};

export type Result<T = any> = ResultSuccess<T> | ResultError;

