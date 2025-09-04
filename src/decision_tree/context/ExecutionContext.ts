import { IExecutionContext } from 'src/decision_tree/context/IExecutionContext';

export class ExecutionContext implements IExecutionContext {
  data: Record<string, any> = {};

  constructor(initialData?: Record<string, any>) {
    if (initialData) this.data = initialData;
  }

  get(key: string) {
    return this.data[key];
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }
}
