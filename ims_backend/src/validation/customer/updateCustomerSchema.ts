import { z } from 'zod';

export const updateCustomerSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().optional(),
        address: z.string().optional(),
        mobile: z.string().regex(/^[6-9]\d{9}$/).optional(),
    }),
});

export type UpdateCustomerParams = z.infer<
    typeof updateCustomerSchema
>['params'];

export type UpdateCustomerBody = z.infer<
    typeof updateCustomerSchema
>['body'];
