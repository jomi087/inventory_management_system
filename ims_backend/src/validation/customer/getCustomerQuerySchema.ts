import { z } from 'zod';

export const getCustomerQuerySchema = z.object({
    query: z.object({
        search: z.string().trim().optional(),
    }),
});


export type GetCustomerRequest = z.infer<typeof getCustomerQuerySchema>['query'];