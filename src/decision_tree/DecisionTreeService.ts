import { RootActionParser } from 'src/decision_tree/parsers';
import { RootExecutor } from 'src/decision_tree/executors';
import { ExecutionContext } from 'src/decision_tree/context/ExecutionContext';

export class DecisionTreeService {
  constructor(
    private readonly parser: RootActionParser,
    private readonly executor: RootExecutor,
  ) {
    //
  }

  async execute(tree: Object) {
    const rootAction = this.parser.parse(tree);

    await this.executor.execute(rootAction, new ExecutionContext());
  }
}
