// services/ExportService.ts
import {
    generateSalesReportPDF,
    generateItemsReportPDF,
    generateCustomerLedgerPDF,
} from '../utils/pdfExporter';

import {
    generateSalesReportExcel,
    generateItemsReportExcel,
    generateCustomerLedgerExcel,
} from '../utils/excelExporter';

import { IExportService } from './ExportServiceInterface';
import { sendMail } from '../utils/mail';

export class ExportServiceV1 implements IExportService {
    async exportSalesPDF(data: any): Promise<Buffer> {
        return generateSalesReportPDF(data);
    }

    async exportItemsPDF(data: any): Promise<Buffer> {
        return generateItemsReportPDF(data);
    }

    async exportCustomerLedgerPDF(data: any): Promise<Buffer> {
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
