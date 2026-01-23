// services/ExportService.ts
import {
    generateSalesReportPDF,
    generateItemsReportPDF,
    generateCustomerLedgerPDF,
} from '../utils/pdfExporter';

import { IExportService } from './ExportServiceInterface';
import { sendMail } from '../utils/mail';
import { CustomerLedgerReport, SaleReportResponse } from '../types/report';
import { ItemReportResult } from '../types/report';

export class ExportServiceV1 implements IExportService {
    async exportSalesPDF(data: SaleReportResponse[]): Promise<Buffer> {
        return generateSalesReportPDF(data);
    }

    async exportItemsPDF(data: ItemReportResult): Promise<Buffer> {
        return generateItemsReportPDF(data);
    }

    async exportCustomerLedgerPDF(data: CustomerLedgerReport): Promise<Buffer> {
        return generateCustomerLedgerPDF(data);
    }

    async sendReportEmail(
        to: string,
        subject: string,
        file: Buffer,
        filename: string
    ) {

        return sendMail(
            to,
            subject,
            'Please find attached report',
            [
                {
                    filename,
                    content: file,
                },
            ],
        );
    }
}
