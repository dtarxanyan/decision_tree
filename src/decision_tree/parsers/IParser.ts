import { IAction } from 'src/decision_tree/actions/IAction';
import { ActionData } from 'src/decision_tree/types';

export interface IParser {
  parse(action: ActionData): IAction;
}
