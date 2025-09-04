import { HttpError } from 'src/errors/HttpError';

export class ValidationError extends HttpError {
  constructor(details?: any, cause?: Error) {
    super(400, 'Validation Error', details, cause);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
