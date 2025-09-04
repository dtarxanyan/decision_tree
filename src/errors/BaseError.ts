export class BaseError extends Error {
  public cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = new.target.name;
    if (cause) this.cause = cause;

    Error.captureStackTrace(this, new.target);
  }
}
