import { GetItemsResult, ItemReportResult } from '../types/Items';
import { SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { SaleReportQuery } from '../validation/report/saleReportSchema';

export interface ReportServiceInterface {
    getCustomerLedger(
        id: string,
        pageNumber: number,
        limitNumber: number
    ): Promise<{
        customer: {
            id: string;
            name: string;
            mobile: string;
        };
        transactions: SaleLedgerResponse[];
        totalAmount: number;
        total: number;
    }>;

    getSalesReport(dateRange: SaleReportQuery): Promise<{
        data: SaleReportResponse[];
        total: number;
    }>;

    getItemsReport(
        pageNumber: number,
        limitNumber: number
    ): Promise<ItemReportResult>;
}
