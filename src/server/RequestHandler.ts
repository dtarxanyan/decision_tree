import http from 'http';
import { IRequestHandler } from 'src/server/IRequestHandler';
import { JsonBodyParser } from 'src/server/JsonBodyParser';
import { DecisionTreeService } from 'src/decision_tree/DecisionTreeService';

export class RequestHandler implements IRequestHandler {
  constructor(
    private readonly jsonBodyParser: JsonBodyParser,
    private readonly decisionTreeService: DecisionTreeService,
  ) {
    //
  }

  async handle(req: http.IncomingMessage, res: http.ServerResponse) {
    const tree = await this.jsonBodyParser.parseJsonBody(req);
    await this.decisionTreeService.execute(tree);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
  }
}
