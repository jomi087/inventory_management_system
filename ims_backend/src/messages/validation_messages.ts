import {
    CUSTOMER_NAME,
    ITEM_DESCRIPTION,
    ITEM_NAME,
    ITEM_NUMBERS,
    PASSWORD_MIN_LENGTH,
} from '../constants/validation_constants';

export const VALIDATION_MESSAGES = {
    NAME_REQUIRED: 'name is required',

    PASSWORD_MIN_LENGTH_REQUIRED: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    PASSWORD_REQUIRED: 'Password is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email format',

    CUSTOMER_NAME_LENGTH: `Item name must be between ${CUSTOMER_NAME.MIN_LENGTH} and ${CUSTOMER_NAME.MAX_LENGTH} characters`,
    MOBILE_REQUIRED: 'mobile number required',
    MOBILE_INVALID: 'Invalid mobile number',
    ADDRESS_REQUIRED: 'address required',

    ITEM_NAME_LENGTH: `Item name must be between ${ITEM_NAME.MIN_LENGTH} and ${ITEM_NAME.MAX_LENGTH} characters`,
    DESCRIPTION_REQUIRED: 'Item description is required',
    DESCRIPTION_LENGTH: `Item description must be between ${ITEM_DESCRIPTION.MIN_LENGTH} and ${ITEM_DESCRIPTION.MAX_LENGTH} characters`,
    QUANTITY_REQUIRED: 'Quantity is required',
    QUANTITY_MIN: `Quantity must be at least ${ITEM_NUMBERS.MIN_QUANTITY}`,
    QUANTITY_INVALID: 'Invalid Quantity',
    PRICE_REQUIRED: 'Price is required',
    PRICE_MIN: `Price must be at least ${ITEM_NUMBERS.MIN_PRICE}`,

    PAGE_NUMBER_INVALID: 'Invalid Page number',
    LIMIT_NUMBER_INVALID: 'Invalid Limit number',

    DATE_FORMAT: 'Invalid date',
    BOTH_OR_NONE_DATES: 'Both from and to must be provided together',
    FROM_AFTER_TO: 'From date cannot be greater than To date',
    FUTURE_DATE: 'Future dates are not allowed',
};
