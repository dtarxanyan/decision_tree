import { IAction } from 'src/decision_tree/actions/IAction';
import { ActionTypes } from 'src/decision_tree/types';
import { LoopPayload } from 'src/decision_tree/payloads/LoopPayload';

export class LoopAction implements IAction<LoopPayload> {
  public readonly type: ActionTypes = ActionTypes.LOOP;

  constructor(
    public readonly payload: LoopPayload,
    public readonly nextAction: IAction,
  ) {
    //
  }
}
