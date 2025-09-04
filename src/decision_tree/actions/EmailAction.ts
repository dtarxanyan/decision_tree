import { IAction } from 'src/decision_tree/actions/IAction';
import { ActionTypes } from 'src/decision_tree/types';
import { EmailPayload } from 'src/decision_tree/payloads/EmailPayload';

export class EmailAction implements IAction<EmailPayload> {
  public readonly type: ActionTypes = ActionTypes.EMAIL;

  constructor(
    public readonly payload: EmailPayload,
    public readonly nextAction: IAction | undefined = undefined,
  ) {
    //
  }
}
