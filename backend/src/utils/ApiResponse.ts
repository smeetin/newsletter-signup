import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

import {
  ApiError,
  ApiResponseError,
  ApiResponseSuccess,
} from "../types/api-response";

export class ApiResponse {
  static success<T>(
    c: Context,
    message: string,
    status: ContentfulStatusCode = 200,
    data: T
  ): Response {
    const res: ApiResponseSuccess<T> = { status, success: true, message, data };

    return c.json(res, status);
  }

  static error(
    c: Context,
    message: string,
    status: ContentfulStatusCode,
    errors?: ApiError[]
  ): Response {
    const res: ApiResponseError = { status, success: false, message, errors };

    return c.json(res, status);
  }
}
