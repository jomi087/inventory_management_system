import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../../messages/validation_messages';

const {PAGE_NUMBER_INVALID, LIMIT_NUMBER_INVALID} = VALIDATION_MESSAGES

export const getItemsQuerySchema = z.object({
    query: z.object({
        search: z.string().trim().optional(),
        page: z
            .string()
            .regex(/^\d+$/, PAGE_NUMBER_INVALID )
            .optional(),
        limit: z
            .string()
            .regex(/^\d+$/, LIMIT_NUMBER_INVALID)
            .optional(),
    }),
});


export type GetItemRequest = z.infer<typeof getItemsQuerySchema>['query'];