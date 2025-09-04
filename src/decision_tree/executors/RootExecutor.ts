import { IExecutor } from 'src/decision_tree/executors/IExecutor';
import { IAction } from 'src/decision_tree/actions/IAction';
import { ExecutorFactory } from 'src/decision_tree/executors/ExecutorFactory';
import { ExecutionContext } from 'src/decision_tree/context/ExecutionContext';

export class RootExecutor implements IExecutor {
  constructor(private readonly executorFactory: ExecutorFactory) {
    //
  }

  async execute(action: IAction, executionContext: ExecutionContext) {
    const executor = this.executorFactory.createExecutor(action.type);

    return executor.execute(action, executionContext);
  }
}
