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
