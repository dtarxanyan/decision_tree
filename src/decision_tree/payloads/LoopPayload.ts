import { IPayload } from 'src/decision_tree/payloads/IPayload';

export class LoopPayload implements IPayload {
  constructor(public readonly iterationCount: number) {
    //
  }
}
