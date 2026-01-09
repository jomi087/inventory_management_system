export const ERROR_MESSAGES = {
    DB_URI_MISSING: 'Database connection string is missing',
    MOBILE_NUMBER_EXIST: 'mobile no already exist',

    CUSTOMER_EXIST: 'Customer already exists',
    CUSTOMER_NOT_FOUND: 'customer not found',
    CUSTOMER_REQUIRED: 'customer info required',
    ITEM_EXIST: 'item already exist',
    ITEM_NOT_FOUND: 'item not found',

    EMAIL_FAILED: 'Failed to send email',

    INSUFFICIENT_STOCK: 'insufficient stock',
    SOMETHING_WENT_WRONG: 'Something went wrong',
} as const;
