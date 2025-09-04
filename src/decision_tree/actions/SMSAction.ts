import { IAction } from 'src/decision_tree/actions/IAction';
import { ActionTypes } from 'src/decision_tree/types';
import { SMSPayload } from 'src/decision_tree/payloads/SMSPayload';

export class SMSAction implements IAction<SMSPayload> {
  public readonly type: ActionTypes = ActionTypes.SMS;

  constructor(
    public readonly payload: SMSPayload,
    public readonly nextAction: IAction | undefined = undefined,
  ) {
    //
  }
}
