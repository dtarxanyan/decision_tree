import { ActionTypes, ExecutionConfig } from 'src/decision_tree/types';
import { IExecutor } from 'src/decision_tree/executors/IExecutor';

export class ExecutorFactory {
  constructor(private readonly executionConfig: ExecutionConfig) {}

  createExecutor(actionType: ActionTypes): IExecutor {
    const executorClass = this.executionConfig[actionType].executor;

    return new executorClass(this);
  }
}
