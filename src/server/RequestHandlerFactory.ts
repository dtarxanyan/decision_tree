import { ServerConfig } from 'src/server/config';
import { ExecutionConfig } from 'src/decision_tree/types';
import { RequestHandler } from 'src/server/RequestHandler';
import { JsonBodyParser } from 'src/server/JsonBodyParser';
import { DecisionTreeService } from 'src/decision_tree/DecisionTreeService';
import { RootActionParser } from 'src/decision_tree/parsers';
import { ParserFactory } from 'src/decision_tree/parsers/ParserFactory';
import { ExecutorFactory, RootExecutor } from 'src/decision_tree/executors';

export class RequestHandlerFactory {
  constructor(
    private readonly serverConfig: ServerConfig,
    private readonly executionConfig: ExecutionConfig,
  ) {}

  createRequestHandler() {
    return new RequestHandler(
      new JsonBodyParser(this.serverConfig),
      new DecisionTreeService(
        new RootActionParser(new ParserFactory(this.executionConfig)),
        new RootExecutor(new ExecutorFactory(this.executionConfig)),
      ),
    );
  }
}
