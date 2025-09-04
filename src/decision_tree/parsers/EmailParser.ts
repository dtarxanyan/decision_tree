import { IParser } from 'src/decision_tree/parsers/IParser';
import { ActionData, ActionSchema, ActionTypes } from 'src/decision_tree/types';
import { ValidationError } from 'src/errors/ValidationError';
import { EmailPayload } from 'src/decision_tree/payloads/EmailPayload';
import { EmailAction } from 'src/decision_tree/actions/EmailAction';
import { ParserFactory } from 'src/decision_tree/parsers/ParserFactory';

export class EmailParser implements IParser {
  constructor(private readonly parserFactory: ParserFactory) {}

  parse(action: ActionData): EmailAction {
    if (action.type !== ActionTypes.EMAIL) {
      throw new ValidationError('Wrong action type provided');
    }

    let parsed;

    try {
      parsed = ActionSchema.parse(action);
    } catch (err: any) {
      throw new ValidationError('Invalid schema provided', err);
    }

    let payload = new EmailPayload(
      action.payload.sender,
      action.payload.receiver,
    );
    let nextAction = undefined;

    if (action.nextAction) {
      const nextActionParser = this.parserFactory.createParser(
        parsed.nextAction,
      );
      nextAction = nextActionParser.parse(parsed.nextAction);
    }

    return new EmailAction(payload, nextAction);
  }
}
