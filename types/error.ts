// Struktur asli dari NestJS
export interface NestApiResponseError {
  statusCode: number;
  message: string | string[];
  error: string;
}

// Struktur ideal yang dikonsumsi oleh UI Front-End
export interface AppValidationError {
  field: string;
  message: string;
}

export class AppError extends Error {
  statusCode: number;
  errors?: AppValidationError[];

  constructor(
    message: string,
    statusCode: number,
    errors?: AppValidationError[],
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
