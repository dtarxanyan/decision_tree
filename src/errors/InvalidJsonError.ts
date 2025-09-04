import { HttpError } from 'src/errors/HttpError';

export class InvalidJsonError extends HttpError {
  constructor(details?: any, cause?: Error) {
    super(400, 'Invalid JSON', details, cause);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
