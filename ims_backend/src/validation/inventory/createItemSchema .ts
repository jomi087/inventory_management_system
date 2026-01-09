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

export const createdItemSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(ITEM_NAME.MIN_LENGTH, ITEM_NAME_LENGTH)
            .max(ITEM_NAME.MAX_LENGTH, ITEM_NAME_LENGTH),
        description: z
            .string()
            .trim()
            .min(ITEM_DESCRIPTION.MIN_LENGTH, DESCRIPTION_LENGTH)
            .max(ITEM_DESCRIPTION.MAX_LENGTH, DESCRIPTION_LENGTH),
        quantity: z.coerce
            .number()
            .int(QUANTITY_INVALID)
            .nonnegative(QUANTITY_MIN),
        price: z.coerce.number().positive(PRICE_MIN),
    }),
});

export type createItemRequest = z.infer<typeof createdItemSchema>['body'];
