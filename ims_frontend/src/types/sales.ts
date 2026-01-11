export interface CreateSalesPayload {
  itemId: string;
  quantity: number;
  paymentType: 'CASH' | 'CUSTOMER';
  customerId?: string;
}
