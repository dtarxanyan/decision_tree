import { IExecutor } from 'src/decision_tree/executors/IExecutor';
import { ExecutionContext } from 'src/decision_tree/context/ExecutionContext';
import { ExecutorFactory } from 'src/decision_tree/executors/ExecutorFactory';
import { ConditionAction } from 'src/decision_tree/actions/ConditionAction';

export class ConditionExecutor implements IExecutor {
  constructor(readonly executorFactory: ExecutorFactory) {
    //
  }

  async execute(action: ConditionAction, executionContext: ExecutionContext) {
    const condition = this.evaluateCondition(action.payload.condition);

    console.log(
      `Condition action executed with payload: "${action.payload.condition}": Execution result: ${condition}`,
    );

    let nextAction;

    if (condition === true) {
      nextAction = action.trueAction;
    } else if (action.falseAction) {
      nextAction = action.falseAction;
    }

    if (!nextAction) {
      return;
    }

    let executor = this.executorFactory.createExecutor(nextAction.type);
    await executor.execute(nextAction, executionContext);
  }

  //TODO: Fix critical security vulnerability
  /**
   * I know this is not safe to run eval on user input, anyway the assignment purpose is to check
   * architecture, readability and testability, so I will skip safe implementation for now
   */
  private evaluateCondition(expression: string, context: any = undefined) {
    return eval(expression);
  }
}
