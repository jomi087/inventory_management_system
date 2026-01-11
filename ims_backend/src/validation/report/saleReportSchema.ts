import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../../messages/validation_messages';
const { PAGE_NUMBER_INVALID, LIMIT_NUMBER_INVALID, DATE_FORMAT } =
    VALIDATION_MESSAGES;

export const saleReportSchema = z.object({
    query: z
        .object({
            from: z
                .string()
                .regex(/^\d{4}-\d{2}-\d{2}$/, DATE_FORMAT)
                .optional(),
            to: z
                .string()
                .regex(/^\d{4}-\d{2}-\d{2}$/, DATE_FORMAT)
                .optional(),
            page: z.string().regex(/^\d+$/, PAGE_NUMBER_INVALID).optional(),
            limit: z.string().regex(/^\d+$/, LIMIT_NUMBER_INVALID).optional(),
        })
        // Rule 1: both or none
        .refine((q) => (q.from && q.to) || (!q.from && !q.to), {
            message: VALIDATION_MESSAGES.BOTH_OR_NONE_DATES,
        })

        // Rule 2: from must not be after to
        .refine(
            (q) => {
                if (!q.from || !q.to) return true;

                const fromDate = new Date(q.from);
                const toDate = new Date(q.to);

                return fromDate <= toDate;
            },
            {
                message: VALIDATION_MESSAGES.FROM_AFTER_TO,
            }
        )
        .refine(
            (q) => {
                if (!q.from || !q.to) return true;
                const now = new Date();
                return new Date(q.from) <= now && new Date(q.to) <= now;
            },
            {
                message: VALIDATION_MESSAGES.FUTURE_DATE,
            }
        ),
});

export type SaleReportQuery = z.infer<typeof saleReportSchema>['query'];
