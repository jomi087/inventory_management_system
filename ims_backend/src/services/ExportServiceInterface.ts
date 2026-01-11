// services/ExportServiceInterface.ts
export interface ExportServiceInterface {
    exportSalesPDF(data: any): Promise<Buffer>;
    exportSalesExcel(data: any): Promise<Buffer>;

    exportItemsPDF(data: any): Promise<Buffer>;
    exportItemsExcel(data: any): Promise<Buffer>;

    exportCustomerLedgerPDF(data: any): Promise<Buffer>;
    exportCustomerLedgerExcel(data: any): Promise<Buffer>;

    sendReportEmail(
        to: string,
        subject: string,
        file: Buffer,
        filename: string
    ): Promise<void>;
}
