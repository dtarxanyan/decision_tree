import { HttpError } from 'src/errors/HttpError';

export class PayloadTooLargeError extends HttpError {
  constructor(details?: any, cause?: Error) {
    super(413, 'Payload Too Large', details, cause);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
