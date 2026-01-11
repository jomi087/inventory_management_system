import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../../messages/validation_messages';

const { PAGE_NUMBER_INVALID, LIMIT_NUMBER_INVALID } = VALIDATION_MESSAGES;

export const itemReportSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/, PAGE_NUMBER_INVALID).optional(),
        limit: z.string().regex(/^\d+$/, LIMIT_NUMBER_INVALID).optional(),
    }),
});

export type ItemReportQuery = z.infer<typeof itemReportSchema>['query'];
