import { z } from 'zod';
import { CUSTOMER_NAME } from '../../constants/validation_constants';
import { VALIDATION_MESSAGES } from '../../messages/validation_messages';

export const createCustomerSchema = z.object({
    body: z.object({
        name: z.string().trim().min(CUSTOMER_NAME.MIN_LENGTH, VALIDATION_MESSAGES.CUSTOMER_NAME_LENGTH),
        address: z.string().trim(),
        mobile: z
            .string()
            .trim()
            .regex(/^[0-9]{10}$/, VALIDATION_MESSAGES.MOBILE_INVALID),
    }),
});

export type CreateCustomerRequest = z.infer<
    typeof createCustomerSchema
>['body'];
