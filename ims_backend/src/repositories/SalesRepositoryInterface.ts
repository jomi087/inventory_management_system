import { SaleLedgerResponse, SaleReportResponse } from '../types/report';

export interface SalesRepositoryInterface {
    createSale(payload: {
        itemId: string;
        quantity: number;
        priceAtSale: number;
        customerId?: string;
        paymentType: 'CASH' | 'CUSTOMER';
    }): Promise<void>;

    getSalesByCustomerId(
        customerId: string,
        skip: number,
        limit: number
    ): Promise<{
        data: SaleLedgerResponse[];
        total: number;
    }>;
    getTotalAmountByCustomerId(customerId: string): Promise<number>;
    findSalesInDateRange(
        from: Date,
        to: Date,
        skip: number,
        limit: number
    ): Promise<{
        data: SaleReportResponse[];
        total: number;
    }>;
}
