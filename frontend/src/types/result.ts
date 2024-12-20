export type ResultSuccess<T> = {
  data: T;
  error: null;
};

export type ResultError = {
  data: null;
  error: {
    message: string,
  };
};

export type Result<T = any> = ResultSuccess<T> | ResultError;
