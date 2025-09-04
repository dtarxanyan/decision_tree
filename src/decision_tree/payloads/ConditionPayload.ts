import { IPayload } from 'src/decision_tree/payloads/IPayload';

export class ConditionPayload implements IPayload {
  constructor(public condition: string) {}
}
