import { ServerResponse } from 'http';
import { HttpError } from 'src/errors/HttpError';
import { IErrorHandler } from 'src/server/IErrorHandler';

export class ErrorHandler implements IErrorHandler {
  handle(err: any, res: ServerResponse) {
    let statusCode = 500;
    let message = 'Something went wrong';

    if (err instanceof HttpError) {
      statusCode = err.statusCode;
      message = err.message;
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        success: false,
        message: message,
      }),
    );

    console.error('Error during request:', err);
  }
}
