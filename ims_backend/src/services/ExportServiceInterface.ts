export interface IExportService {
    exportSalesPDF(data: any): Promise<Buffer>;

    exportItemsPDF(data: any): Promise<Buffer>;

    exportCustomerLedgerPDF(data: any): Promise<Buffer>;

    sendReportEmail(
        to: string,
        subject: string,
        file: Buffer,
        filename: string
    ): Promise<void>;
}
