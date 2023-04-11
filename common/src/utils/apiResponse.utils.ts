import { StatusCodes as status } from "http-status-codes";
import { ApiResponseInterface } from "../interfaces/apiResponse.interface";

/**
 * Returns a custom response.
 */
export function apiResponse(
  code: number,
  responseStatus: string,
  message: string,
  data?: unknown
): ApiResponseInterface {
  return {
    code,
    status: responseStatus,
    message,
    data,
  };
}

/**
 * Returns a response with status code 400.
 */
export function apiBadRequestResponse(message: string): ApiResponseInterface {
  return {
    code: status.BAD_REQUEST,
    status: "BAD_REQUEST",
    message,
  };
}

/**
 * Returns a response with status code 404.
 */
export function apiNotFoundResponse(message: string): ApiResponseInterface {
  return {
    code: status.NOT_FOUND,
    status: "NOT_FOUND",
    message,
  };
}

/**
 * Returns a response with status code 429.
 */
export function apiTooManyRequestsResponse(
  message: string
): ApiResponseInterface {
  return {
    code: status.TOO_MANY_REQUESTS,
    status: "TOO_MANY_REQUESTS",
    message,
  };
}

/**
 * Returns a response with status code 403.
 */
export function apiForbiddenResponse(message: string): ApiResponseInterface {
  return {
    code: status.FORBIDDEN,
    status: "FORBIDDEN",
    message,
  };
}

/**
 * Returns a validation error response.
 */
export function apiResponseValidationError(
  errors: unknown
): ApiResponseInterface {
  const errorsCustomMessage = (inputErrors: {
    details: { path: string; message: string }[];
  }): { [key: string]: string } =>
    inputErrors.details.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.path]: curr.message,
      }),
      {}
    );

  return {
    code: status.UNPROCESSABLE_ENTITY,
    status: "UNPROCESSABLE_ENTITY",
    message: "The given data was invalid.",
    errors: errorsCustomMessage(
      errors as { details: { path: string; message: string }[] }
    ),
  };
}
