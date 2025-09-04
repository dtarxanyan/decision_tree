import { IParser } from 'src/decision_tree/parsers/IParser';
import { ActionData, ActionSchema, ActionTypes } from 'src/decision_tree/types';
import { ValidationError } from 'src/errors/ValidationError';
import { IAction } from 'src/decision_tree/actions/IAction';
import { ConditionAction } from 'src/decision_tree/actions/ConditionAction';
import { ConditionPayload } from 'src/decision_tree/payloads/ConditionPayload';
import { ParserFactory } from 'src/decision_tree/parsers/ParserFactory';

export class ConditionParser implements IParser {
  constructor(private readonly parserFactory: ParserFactory) {}

  parse(action: ActionData): ConditionAction {
    if (action.type !== ActionTypes.CONDITION) {
      console.log(action.type);
      throw new ValidationError('Wrong action type provided');
    }

    let parsed;

    try {
      parsed = ActionSchema.parse(action);
    } catch (err: any) {
      throw new ValidationError('Invalid schema provided', err);
    }

    let payload = new ConditionPayload(action.payload);

    const trueActionParser = this.parserFactory.createParser(parsed.trueAction);
    const trueAction = trueActionParser.parse(parsed.trueAction) as IAction;
    let falseAction = undefined;

    if (parsed.falseAction) {
      let falseActionParser = this.parserFactory.createParser(
        parsed.falseAction,
      );
      falseAction = falseActionParser.parse(parsed.falseAction) as IAction;
    }

    return new ConditionAction(payload, trueAction, falseAction);
  }
}
