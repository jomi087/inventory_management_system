import { z } from 'zod';

export const createSaleSchema = z.object({
    body: z.object({
        itemId: z.string(),
        quantity: z.number().min(1),
        customerId: z.string().optional(),
        paymentType: z.enum(['CASH', 'CUSTOMER']),
    }),
});

export type CreateSaleBody = z.infer<typeof createSaleSchema>['body'];
