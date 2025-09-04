import { IParser } from 'src/decision_tree/parsers/IParser';
import { ActionData, ActionSchema, ActionTypes } from 'src/decision_tree/types';
import { SMSPayload } from 'src/decision_tree/payloads/SMSPayload';
import { SMSAction } from 'src/decision_tree/actions/SMSAction';
import { ValidationError } from 'src/errors/ValidationError';
import { ParserFactory } from 'src/decision_tree/parsers/ParserFactory';

export class SMSParser implements IParser {
  constructor(private readonly parserFactory: ParserFactory) {}

  parse(action: ActionData): SMSAction {
    if (action.type !== ActionTypes.SMS) {
      throw new ValidationError('Wrong action type provided');
    }

    let parsed;

    try {
      parsed = ActionSchema.parse(action);
    } catch (err: any) {
      throw new ValidationError('Invalid schema provided', err);
    }

    let payload = new SMSPayload(action.payload.phone);
    let nextAction = undefined;

    if (action.nextAction) {
      const nextActionParser = this.parserFactory.createParser(
        parsed.nextAction,
      );
      nextAction = nextActionParser.parse(parsed.nextAction);
    }

    return new SMSAction(payload, nextAction);
  }
}
