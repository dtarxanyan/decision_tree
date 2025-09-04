import { ActionData } from 'src/decision_tree/types';
import { IParser } from 'src/decision_tree/parsers/IParser';
import { IAction } from 'src/decision_tree/actions/IAction';
import { ParserFactory } from 'src/decision_tree/parsers/ParserFactory';

export class RootActionParser implements IParser {
  constructor(private parserFactory: ParserFactory) {
    //
  }

  parse(action: ActionData): IAction {
    const parser = this.parserFactory.createParser(action);

    return parser.parse(action);
  }
}
