import { z } from 'zod';

export const deleteItemSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Item id is required'),
  }),
});

export type DeleteItemParams =
  z.infer<typeof deleteItemSchema>['params'];
