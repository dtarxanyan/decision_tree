import { BaseError } from 'src/errors/BaseError';

export class HttpError extends BaseError {
  public statusCode: number;
  public details?: any;

  constructor(
    statusCode: number,
    message: string,
    details?: any,
    cause?: Error,
  ) {
    super(message, cause);
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
