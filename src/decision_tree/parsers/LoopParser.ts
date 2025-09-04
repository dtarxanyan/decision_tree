import { IParser } from 'src/decision_tree/parsers/IParser';
import { ActionData, ActionSchema, ActionTypes } from 'src/decision_tree/types';
import { ValidationError } from 'src/errors/ValidationError';
import { LoopAction } from 'src/decision_tree/actions/LoopAction';
import { LoopPayload } from 'src/decision_tree/payloads/LoopPayload';
import { ParserFactory } from 'src/decision_tree/parsers/ParserFactory';

export class LoopParser implements IParser {
  constructor(private readonly parserFactory: ParserFactory) {}

  parse(action: ActionData): LoopAction {
    if (action.type !== ActionTypes.LOOP) {
      throw new ValidationError('Wrong action type provided');
    }

    let parsed;

    try {
      parsed = ActionSchema.parse(action);
    } catch (err: any) {
      throw new ValidationError('Invalid schema provided', err);
    }

    let payload = new LoopPayload(action.payload.iterationCount);

    const nextActionParser = this.parserFactory.createParser(parsed.nextAction);
    const nextAction = nextActionParser.parse(parsed.nextAction);

    return new LoopAction(payload, nextAction);
  }
}
