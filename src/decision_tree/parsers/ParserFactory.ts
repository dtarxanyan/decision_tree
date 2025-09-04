import {
  ActionData,
  ActionTypes,
  ExecutionConfig,
} from 'src/decision_tree/types';

export class ParserFactory {
  constructor(private readonly config: ExecutionConfig) {}

  createParser(action: ActionData) {
    const type = action.type as ActionTypes;
    const parserClass = this.config[type].parser;

    return new parserClass(this);
  }
}
