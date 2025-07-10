export type ApiError = {
  path: string;
  message: string;
};

export type ApiResponseSuccess<T = any> = {
  status: number;
  success: true;
  message: string;
  data: T;
};

export type ApiResponseError = {
  status: number;
  success: false;
  message: string;
  errors?: ApiError[];
};
