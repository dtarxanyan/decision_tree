import { IAction } from 'src/decision_tree/actions/IAction';
import { ActionTypes } from 'src/decision_tree/types';
import { ConditionPayload } from 'src/decision_tree/payloads/ConditionPayload';

export class ConditionAction implements IAction<ConditionPayload> {
  public readonly type: ActionTypes = ActionTypes.CONDITION;

  constructor(
    public readonly payload: ConditionPayload,
    public readonly trueAction: IAction,
    public readonly falseAction: IAction | undefined = undefined,
  ) {
    //
  }
}
