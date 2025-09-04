import { IPayload } from 'src/decision_tree/payloads/IPayload';
import { ActionTypes } from 'src/decision_tree/types';

export interface IAction<T extends IPayload = IPayload> {
  readonly type: ActionTypes;
  readonly payload: T;
}
