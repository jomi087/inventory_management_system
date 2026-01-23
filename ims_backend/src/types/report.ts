import { GetItemsResult } from './Items';

export interface SaleLedgerResponse {
    id: string;
    item: {
        id: string;
        name: string;
    };
    quantity: number;
    priceAtSale: number;
    paymentType: 'CASH' | 'CUSTOMER';
    createdAt: Date;
}

export interface SaleReportResponse {
    id: string;
    item: {
        id: string;
        name: string;
    };
    quantity: number;
    priceAtSale: number;
    customer: {
        id: string;
        name: string;
        mobile: string;
    } | null;
    paymentType: 'CASH' | 'CUSTOMER';
    createdAt: Date;
}

export interface ItemReportResult extends GetItemsResult {
    lowStockCount: number;
    outOfStockCount: number;
    totalInventoryValue: number;
}

export interface CustomerLedgerReport {
    customer: {
        id: string;
        name: string;
        mobile: string;
    };
    transactions: SaleLedgerResponse[];
    totalAmount: number;
    total: number;
}
