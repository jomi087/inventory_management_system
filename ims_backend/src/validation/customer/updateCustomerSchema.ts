import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../../messages/validation_messages';
import { CUSTOMER_NAME } from '../../constants/validation_constants';

export const updateCustomerSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().trim().min(CUSTOMER_NAME.MIN_LENGTH, VALIDATION_MESSAGES.CUSTOMER_NAME_LENGTH).optional(),
        address: z.string().optional(),
        mobile: z.string().regex(/^[7-9]\d{9}$/,VALIDATION_MESSAGES.MOBILE_INVALID).optional(),
    }),
});

export type UpdateCustomerParams = z.infer<
    typeof updateCustomerSchema
>['params'];

export type UpdateCustomerBody = z.infer<
    typeof updateCustomerSchema
>['body'];
