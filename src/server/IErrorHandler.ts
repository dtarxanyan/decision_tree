import { ServerResponse } from 'http';

export interface IErrorHandler {
  handle(err: any, res: ServerResponse): void;
}
