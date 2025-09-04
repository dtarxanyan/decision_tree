import http from 'http';
import { ErrorHandler } from 'src/server/ErrorHandler';
import { serverConfig } from 'src/server/config';
import { executionConfig } from 'src/decision_tree/config';
import { RequestHandlerFactory } from 'src/server/RequestHandlerFactory';

const PORT = 3000;

const requestHandlerFactory = new RequestHandlerFactory(
  serverConfig,
  executionConfig,
);

const requestHandler = requestHandlerFactory.createRequestHandler();
const errorHandler = new ErrorHandler();

async function handleRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
) {
  try {
    // TODO: Refactor into a router class to map paths to request handlers.
    if (req.url !== '/execute' || req.method !== 'POST') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
      return;
    }

    await requestHandler.handle(req, res);
  } catch (err: any) {
    errorHandler.handle(err, res);
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
