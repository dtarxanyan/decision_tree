import { IPayload } from 'src/decision_tree/payloads/IPayload';

export class SMSPayload implements IPayload {
  constructor(private readonly phone: string) {
    //
  }
}
