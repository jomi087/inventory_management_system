import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../../messages/validation_messages';
import { ITEM_DESCRIPTION, ITEM_NAME } from '../../constants/validation_constants';

const {
    ITEM_NAME_LENGTH,
    DESCRIPTION_LENGTH,
    QUANTITY_INVALID,
    QUANTITY_MIN,
    PRICE_MIN,
} = VALIDATION_MESSAGES;

export const updateItemSchema = z.object({

    params: z.object({
        id: z.string()
    }),
    body: z.object({
        name: z
            .string()
            .trim()
            .min(ITEM_NAME.MIN_LENGTH, ITEM_NAME_LENGTH)
            .max(ITEM_NAME.MAX_LENGTH, ITEM_NAME_LENGTH)
            .optional(),
        description: z
            .string()
            .trim()
            .min(ITEM_DESCRIPTION.MIN_LENGTH, DESCRIPTION_LENGTH)
            .max(ITEM_DESCRIPTION.MAX_LENGTH, DESCRIPTION_LENGTH)
            .optional(),
        quantity: z.coerce
            .number()
            .int(QUANTITY_INVALID)
            .nonnegative(QUANTITY_MIN)
            .optional(),
        price: z.coerce.number().positive(PRICE_MIN).optional(),
    }),
});


export type UpdateItemParams = z.infer<typeof updateItemSchema>['params'];
export type UpdateItemBody = z.infer<typeof updateItemSchema>['body'];