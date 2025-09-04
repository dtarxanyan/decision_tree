import { IAction } from 'src/decision_tree/actions/IAction';
import { ExecutionContext } from 'src/decision_tree/context/ExecutionContext';

export interface IExecutor {
  execute(action: IAction, executionContext: ExecutionContext): Promise<void>;
}
