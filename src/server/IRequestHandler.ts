import http from 'http';

export interface IRequestHandler {
  handle(req: http.IncomingMessage, res: http.ServerResponse): Promise<void>;
}
