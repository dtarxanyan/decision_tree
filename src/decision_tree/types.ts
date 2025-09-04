import { z } from 'zod';
import { IAction } from 'src/decision_tree/actions/IAction';
import { IPayload } from 'src/decision_tree/payloads/IPayload';
import { IExecutor } from 'src/decision_tree/executors/IExecutor';
import { IParser } from 'src/decision_tree/parsers/IParser';

export enum ActionTypes {
  CONDITION = 'CONDITION',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  LOOP = 'LOOP',
}

export type ExecutionConfig = {
  [K in ActionTypes]: {
    action: new (...args: any[]) => IAction;
    payload: new (...args: any[]) => IPayload;
    executor: new (...args: any[]) => IExecutor;
    parser: new (...args: any[]) => IParser;
  };
};

export const SMSPayloadSchema = z.object({
  phone: z.string().min(5),
});

export const EmailPayloadSchema = z.object({
  sender: z.email(),
  receiver: z.email(),
});

export const LoopPayloadSchema = z.object({
  iterationCount: z.number().min(2),
});

export const ConditionPayloadSchema = z.string();

export const ActionSchema: z.ZodType<any> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({
      type: z.literal(ActionTypes.SMS),
      payload: SMSPayloadSchema,
      nextAction: z.optional(ActionSchema),
    }),
    z.object({
      type: z.literal(ActionTypes.EMAIL),
      payload: EmailPayloadSchema,
      nextAction: z.optional(ActionSchema),
    }),
    z.object({
      type: z.literal(ActionTypes.LOOP),
      payload: LoopPayloadSchema,
      nextAction: z.optional(ActionSchema),
    }),
    z.object({
      type: z.literal(ActionTypes.CONDITION),
      payload: ConditionPayloadSchema,
      trueAction: z.optional(ActionSchema),
      falseAction: z.optional(ActionSchema),
    }),
  ]),
);

export type ActionData = z.infer<typeof ActionSchema>;
