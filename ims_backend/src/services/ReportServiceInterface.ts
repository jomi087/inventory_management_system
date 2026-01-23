import { CustomerLedgerReport, ItemReportResult, SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { SaleReportQuery } from '../validation/report/saleReportSchema';

export interface IReportService {
    getCustomerLedger(
        id: string,
        pageNumber: number,
        limitNumber: number
    ): Promise<CustomerLedgerReport>;

    getSalesReport(dateRange: SaleReportQuery): Promise<{
        data: SaleReportResponse[];
        total: number;
    }>;

    getItemsReport(
        pageNumber: number,
        limitNumber: number
    ): Promise<ItemReportResult>;
}
