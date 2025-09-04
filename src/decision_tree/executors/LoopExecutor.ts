import { IExecutor } from 'src/decision_tree/executors/IExecutor';
import { ExecutionContext } from 'src/decision_tree/context/ExecutionContext';
import { ExecutorFactory } from 'src/decision_tree/executors/ExecutorFactory';
import { LoopAction } from 'src/decision_tree/actions/LoopAction';

export class LoopExecutor implements IExecutor {
  constructor(readonly executorFactory: ExecutorFactory) {
    //
  }

  async execute(action: LoopAction, context: ExecutionContext) {
    console.log(
      `Loop action execution started with payload: ${JSON.stringify(action.payload)}`,
    );

    const iterationCount = action.payload.iterationCount;
    const nextAction = action.nextAction;
    const executor = this.executorFactory.createExecutor(nextAction.type);

    for (let i = 0; i < iterationCount; i++) {
      console.log(` ===== Iteration ${i} =====`);
      await executor.execute(nextAction, context);
    }
  }
}
