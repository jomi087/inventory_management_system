import { CustomerLedgerReport, ItemReportResult } from "../types/report";
import { SaleReportResponse } from "../types/report";

export interface IExportService {
    exportSalesPDF(data: SaleReportResponse[]): Promise<Buffer>;

    exportItemsPDF(data: ItemReportResult): Promise<Buffer>;

    exportCustomerLedgerPDF(data: CustomerLedgerReport): Promise<Buffer>;

    sendReportEmail(
        to: string,
        subject: string,
        file: Buffer,
        filename: string
    ): Promise<void>;
}
