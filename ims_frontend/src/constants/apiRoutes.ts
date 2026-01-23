export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
  },

  ITEMS: {
    ROOT: '/inventory/items',
    BY_ID: (id: string) => `/inventory/items/${id}`,
  },

  SALES: {
    ROOT: '/sales',
  },

  CUSTOMERS: {
    ROOT: '/customers',
    BY_ID: (id: string) => `/customers/${id}`,
  },

  REPORTS: {
    SALES: '/reports/sales',
    ITEMS: '/reports/items',
    CUSTOMER_LEDGER: (customerId: string) =>
      `/reports/customers/${customerId}`,
  },
} as const;