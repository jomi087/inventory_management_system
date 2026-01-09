export const PASSWORD_MIN_LENGTH = 8;
export const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
export const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ITEM_NAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 100,
};

export const CUSTOMER_NAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 100,
};


export const ITEM_DESCRIPTION = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 500,
};

export const ITEM_NUMBERS = {
  MIN_QUANTITY: 0,
  MIN_PRICE: 1,
};