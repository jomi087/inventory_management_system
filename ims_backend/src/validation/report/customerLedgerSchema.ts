import { z } from 'zod';

export const customerLedgerSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export type CustomerLedgerParams = z.infer<typeof customerLedgerSchema>['params'];
