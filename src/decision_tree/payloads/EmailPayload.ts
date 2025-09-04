import { IPayload } from 'src/decision_tree/payloads/IPayload';

export class EmailPayload implements IPayload {
  constructor(
    public readonly sender: string,
    private readonly receiver: string,
  ) {
    //
  }
}
