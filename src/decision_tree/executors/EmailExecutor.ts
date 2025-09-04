import { IExecutor } from 'src/decision_tree/executors/IExecutor';
import { ExecutionContext } from 'src/decision_tree/context/ExecutionContext';
import { ExecutorFactory } from 'src/decision_tree/executors/ExecutorFactory';
import { EmailAction } from 'src/decision_tree/actions/EmailAction';

export class EmailExecutor implements IExecutor {
  constructor(readonly executorFactory: ExecutorFactory) {
    //
  }

  async execute(action: EmailAction, executionContext: ExecutionContext) {
    console.log(
      `Email action executed with payload: ${JSON.stringify(action.payload)}`,
    );

    const nextAction = action.nextAction;

    if (!nextAction) {
      return;
    }

    let executor = this.executorFactory.createExecutor(nextAction.type);
    await executor.execute(nextAction, executionContext);
  }
}
