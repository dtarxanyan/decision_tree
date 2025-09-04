import { ActionTypes, ExecutionConfig } from 'src/decision_tree/types';
import * as actions from 'src/decision_tree/actions';
import * as payloads from 'src/decision_tree/payloads';
import * as parsers from 'src/decision_tree/parsers';
import * as executors from 'src/decision_tree/executors';

export const executionConfig: ExecutionConfig = {
  [ActionTypes.SMS]: {
    action: actions.SMSAction,
    payload: payloads.SMSPayload,
    executor: executors.SMSExecutor,
    parser: parsers.SMSParser,
  },
  [ActionTypes.EMAIL]: {
    action: actions.EmailAction,
    payload: payloads.EmailPayload,
    executor: executors.EmailExecutor,
    parser: parsers.EmailParser,
  },
  [ActionTypes.CONDITION]: {
    action: actions.ConditionAction,
    payload: payloads.ConditionPayload,
    executor: executors.ConditionExecutor,
    parser: parsers.ConditionParser,
  },
  [ActionTypes.LOOP]: {
    action: actions.LoopAction,
    payload: payloads.LoopPayload,
    executor: executors.LoopExecutor,
    parser: parsers.LoopParser,
  },
};
