import http from 'http';
import { PayloadTooLargeError } from 'src/errors/PayloadTooLargeError';
import { InvalidJsonError } from 'src/errors/InvalidJsonError';
import { ServerConfig } from 'src/server/config';

export class JsonBodyParser {
  constructor(private readonly config: ServerConfig) {}

  parseJsonBody(req: http.IncomingMessage): Promise<object> {
    return new Promise((resolve, reject) => {
      let body = '';

      req.on('data', (chunk: Buffer | string) => {
        body += chunk.toString();
        if (body.length > this.config.maxBodySize) {
          req.pause();
          reject(
            new PayloadTooLargeError({ maxSize: this.config.maxBodySize }),
          );
        }
      });

      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          reject(new InvalidJsonError('Failed to parse JSON', err as Error));
        }
      });

      req.on('error', (err) => reject(err));
    });
  }
}
