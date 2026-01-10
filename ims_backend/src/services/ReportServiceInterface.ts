import { GetItemsResult } from '../types/Items';
import { SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { SaleReportQuery } from '../validation/report/saleReportSchema';

export interface ReportServiceInterface {
    getCustomerLedger(id: string): Promise<{
        customer: {
            id: string;
            name: string;
            mobile: string;
        };
        transactions: SaleLedgerResponse[];
        totalAmount: number;
    }>;

    getSalesReport(dateRange: SaleReportQuery): Promise<SaleReportResponse[]>;
    getItemsReport(
        search: string,
        pageNumber: number,
        limitNumber: number
    ): Promise<GetItemsResult>;
}
