import { SaleLedgerResponse, SaleReportResponse } from '../types/report';

export interface SalesRepositoryInterface {
    createSale(payload: {
        itemId: string;
        quantity: number;
        priceAtSale: number;
        customerId?: string;
        paymentType: 'CASH' | 'CUSTOMER';
    }): Promise<void>;

    getSalesByCustomerId(customerId: string): Promise<SaleLedgerResponse[]>;
    findSalesInDateRange(from: Date, to: Date): Promise<SaleReportResponse[]>;
}
